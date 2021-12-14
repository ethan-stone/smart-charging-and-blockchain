import { ArrowNarrowRightIcon, ArrowLeftIcon } from "@heroicons/react/solid";
import { useNavigate } from "react-router-dom";
import { Program, Provider, web3 } from "@project-serum/anchor";
import { useConnection } from "@solana/wallet-adapter-react";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { Token, TOKEN_PROGRAM_ID } from "@solana/spl-token";

import idl from "../idl.json";

const programID = new PublicKey(idl.metadata.address);

export default function Setup() {
  const navigate = useNavigate();
  const { connection } = useConnection();
  const wallet = useAnchorWallet();

  async function handleSetup() {
    if (!wallet) {
      alert("go back and connect a wallet");
      return;
    }

    const provider = new Provider(connection, wallet, {
      preflightCommitment: "processed"
    });

    // @ts-ignore
    const program = new Program(idl, programID, provider);
    const signature = await program.provider.connection.requestAirdrop(
      program.provider.wallet.publicKey,
      web3.LAMPORTS_PER_SOL
    );

    await program.provider.connection.confirmTransaction(signature);

    const driver = web3.Keypair.generate();
    console.log("driver account");
    console.log(driver);

    const chargeSessionAccount = web3.Keypair.generate();
    console.log("charge session account");
    console.log(chargeSessionAccount);

    const payer = web3.Keypair.generate();

    const payerSignature = await program.provider.connection.requestAirdrop(
      payer.publicKey,
      web3.LAMPORTS_PER_SOL
    );

    await program.provider.connection.confirmTransaction(payerSignature);

    const [programSigner, nonce] = await web3.PublicKey.findProgramAddress(
      [chargeSessionAccount.publicKey.toBuffer()],
      program.programId
    );

    const token = await Token.createMint(
      program.provider.connection,
      payer,
      programSigner,
      programSigner,
      6,
      TOKEN_PROGRAM_ID
    );

    const driverAssociatedTokenAccount =
      await token.createAssociatedTokenAccount(driver.publicKey);

    console.log("driver associated token account");
    console.log(driverAssociatedTokenAccount);

    await program.provider.connection.confirmTransaction(payerSignature);

    console.log("driver account before");
    console.log(await token.getAccountInfo(driverAssociatedTokenAccount));

    await program.rpc.stopCharge(nonce, {
      accounts: {
        programSigner,
        driverIgneous: driverAssociatedTokenAccount,
        chargeSessionAccount: chargeSessionAccount.publicKey,
        authority: program.provider.wallet.publicKey,
        igneousMint: token.publicKey,
        tokenProgram: TOKEN_PROGRAM_ID,
        systemProgram: web3.SystemProgram.programId
      }
    });

    console.log("driver account after");
    console.log(await token.getAccountInfo(driverAssociatedTokenAccount));

    console.log(
      "if you look at amount in the account you can see that some token was rewarded"
    );
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-green-500 via-green-700 to-green-500 items-center justify-center flex-col gap-5">
      <div className="flex flex-col w-3/4 2xl:w-1/2 bg-white p-10 rounded-xl shadow-2xl">
        <h1 className="font-bold text-4xl pb-5 place-self-center">Setup</h1>
        <p className="text-lg p-4">
          There are a number of things that need to be setup first.
        </p>
        <p className="text-lg p-4">
          We need a keypair for the <b> driver's wallet</b>
        </p>
        <p className="text-lg p-4">
          We need a keypair for an account to store information of the
          <b> charge session</b>
        </p>
        <p className="text-lg p-4">
          We need a <b>mint</b> in order to reward our SPL token to the driver
        </p>
        <p className="text-lg p-4">
          Hit run and open the console to see what happened
        </p>

        <button
          className="bg-green-600 px-10 py-5 rounded-lg"
          onClick={handleSetup}
        >
          Run
        </button>
      </div>
      <div className="flex flex-row gap-20">
        <button
          className="bg-white shadow-lg px-10 py-5 rounded"
          onClick={() => navigate("/connect-wallet")}
        >
          <ArrowLeftIcon className="h-5 w-5 text-green-600" />
        </button>
        <button
          className="bg-white shadow-lg px-10 py-5 rounded"
          onClick={() => navigate("/start-charge")}
        >
          <ArrowNarrowRightIcon className="h-5 w-5 text-green-600" />
        </button>
      </div>
    </div>
  );
}
