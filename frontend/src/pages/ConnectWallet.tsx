import { ArrowNarrowRightIcon, ArrowLeftIcon } from "@heroicons/react/solid";
import { useNavigate } from "react-router-dom";
import {
  WalletDisconnectButton,
  WalletModalProvider,
  WalletMultiButton
} from "@solana/wallet-adapter-react-ui";

export default function ConnectWallet() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-green-500 via-green-700 to-green-500 items-center justify-center flex-col gap-5">
      <div className="flex flex-col w-3/4 2xl:w-1/2 bg-white p-10 rounded-xl shadow-2xl">
        <h1 className="font-bold text-4xl pb-5 place-self-center">
          Connect a Wallet
        </h1>
        <div className="text-lg pb-5 text-center place-self-center">
          This will be the <b> CPOs</b> wallet as they have the authority to
          mint rewarded tokens
        </div>
        <WalletModalProvider>
          <WalletMultiButton />
          <WalletDisconnectButton />
        </WalletModalProvider>
      </div>
      <div className="flex flex-row gap-20">
        <button
          className="bg-white shadow-lg px-10 py-5 rounded"
          onClick={() => navigate("/terminology")}
        >
          <ArrowLeftIcon className="h-5 w-5 text-green-600" />
        </button>
        <button
          className="bg-white shadow-lg px-10 py-5 rounded"
          onClick={() => navigate("/setup")}
        >
          <ArrowNarrowRightIcon className="h-5 w-5 text-green-600" />
        </button>
      </div>
    </div>
  );
}
