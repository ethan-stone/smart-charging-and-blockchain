import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { SmartChargingAndBlockchain } from "../target/types/smart_charging_and_blockchain";
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  Token,
  TOKEN_PROGRAM_ID
} from "@solana/spl-token";

describe("smart-charging-and-blockchain", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.Provider.env());

  // @ts-ignore
  const program = anchor.workspace
    .SmartChargingAndBlockchain as Program<SmartChargingAndBlockchain>;

  const cpo = program.provider.wallet;

  let driver: anchor.web3.Keypair;
  let chargeSessionAccount: anchor.web3.Keypair;
  it("Is initialized!", async () => {
    // Add your test here.

    const signature = await program.provider.connection.requestAirdrop(
      cpo.publicKey,
      anchor.web3.LAMPORTS_PER_SOL
    );

    await program.provider.connection.confirmTransaction(signature);

    chargeSessionAccount = anchor.web3.Keypair.generate();

    driver = anchor.web3.Keypair.generate();

    const tx = await program.rpc.initialize({
      accounts: {
        chargeSessionAccount: chargeSessionAccount.publicKey,
        authority: cpo.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
        clock: anchor.web3.SYSVAR_CLOCK_PUBKEY
      },
      signers: [chargeSessionAccount]
    });
  });

  it("Should mint tokens when charge stops", async () => {
    // https://github.com/solana-labs/solana-program-library/blob/master/token/js/client/token.js
    // github.com/Henry-E/dog-money/blob
    // github.com/Henry-E/dog-money/blob/main/tests/dog-money.js/main/tests / utils / index.js

    const payer = anchor.web3.Keypair.generate();

    const payerSignature = await program.provider.connection.requestAirdrop(
      payer.publicKey,
      anchor.web3.LAMPORTS_PER_SOL
    );

    await program.provider.connection.confirmTransaction(payerSignature);

    const [programSigner, nonce] =
      await anchor.web3.PublicKey.findProgramAddress(
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

    await program.rpc.stopCharge(nonce, {
      accounts: {
        programSigner,
        driverIgneous: driverAssociatedTokenAccount,
        chargeSessionAccount: chargeSessionAccount.publicKey,
        authority: cpo.publicKey,
        igneousMint: token.publicKey,
        tokenProgram: TOKEN_PROGRAM_ID,
        systemProgram: anchor.web3.SystemProgram.programId
      }
    });

    console.log(await token.getAccountInfo(driverAssociatedTokenAccount));
  });
});
