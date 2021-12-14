import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { web3 } from "@project-serum/anchor";
import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon, ArrowNarrowRightIcon } from "@heroicons/react/solid";

export default function ChargingProfile() {
  const navigate = useNavigate();

  const { state } = useLocation();

  console.log(state);

  async function handleStartCharge() {
    await state.program.rpc.initialize({
      accounts: {
        chargeSessionAccount: state.chargeSessionAccount.publicKey,
        authority: state.program.provider.wallet.publicKey,
        systemProgram: web3.SystemProgram.programId,
        clock: web3.SYSVAR_CLOCK_PUBKEY
      },
      signers: [state.chargeSessionAccount]
    });
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-green-500 via-green-700 to-green-500 items-center justify-center flex-col gap-5">
      <div className="flex items-center justify-center w-3/4 2xl:w-1/2 bg-white p-10 rounded-xl shadow-2xl">
        <div className="flex items-center justify-center">
          <button
            className="py-5 px-10 bg-gradient-to-r from-green-700 to-green-500 text-white rounded-lg font-bold"
            onClick={handleStartCharge}
          >
            Start Charge
          </button>
        </div>
      </div>
    </div>
  );
}
