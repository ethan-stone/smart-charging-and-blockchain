import React, { useMemo } from "react";
import { getPhantomWallet } from "@solana/wallet-adapter-wallets";
import {
  ConnectionProvider,
  WalletProvider
} from "@solana/wallet-adapter-react";
import { Route, Routes } from "react-router-dom";
import StartCharge from "./pages/StartCharge";
import Overview from "./pages/Overview";
import Terminology from "./pages/Terminology";
import ConnectWallet from "./pages/ConnectWallet";

import "./App.css";
import "./index.css";
import Setup from "./pages/Setup";

function App() {
  const wallets = useMemo(() => [getPhantomWallet()], []);
  const network = "http://127.0.0.1:8899";

  return (
    <ConnectionProvider endpoint={network}>
      <WalletProvider wallets={wallets}>
        <main>
          <Routes>
            <Route path="/overview" element={<Overview />} />
            <Route path="/terminology" element={<Terminology />} />
            <Route path="/connect-wallet" element={<ConnectWallet />} />
            <Route path="/setup" element={<Setup />} />
            <Route path="/start-charge" element={<StartCharge />} />
            <Route path="*" element={<Overview />} />
          </Routes>
        </main>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default App;
