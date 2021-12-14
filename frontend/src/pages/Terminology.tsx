import { ArrowNarrowRightIcon, ArrowLeftIcon } from "@heroicons/react/solid";
import { useNavigate } from "react-router-dom";

export default function Terminology() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-green-500 via-green-700 to-green-500 items-center justify-center flex-col gap-5">
      <div className="flex flex-col w-3/4 2xl:w-1/2 bg-white p-10 rounded-xl shadow-2xl">
        <h1 className="font-bold text-4xl pb-5 place-self-center">
          Terminology
        </h1>
        <h2 className="font-bold text-2xl pb-5">Charge Point Operator (CPO)</h2>
        <div className="pb-5">
          A CPO is the entity that is operating the charging stations. They
          request charges for you, and manage the stations. The CPO would
          actually be the one to build this decentralized reward system, and is
          what you will act as in this demo
        </div>
        <h2 className="font-bold text-2xl pb-5">Flexible Charging</h2>
        <div className="pb-5">
          Flexible is simply defined as charging at a slower rate, ie with less
          power, than with what is labeled on the EVSE.
        </div>
      </div>
      <div className="flex flex-row gap-20">
        <button
          className="bg-white shadow-lg px-10 py-5 rounded"
          onClick={() => navigate("/overview")}
        >
          <ArrowLeftIcon className="h-5 w-5 text-green-600" />
        </button>
        <button
          className="bg-white shadow-lg px-10 py-5 rounded"
          onClick={() => navigate("/connect-wallet")}
        >
          <ArrowNarrowRightIcon className="h-5 w-5 text-green-600" />
        </button>
      </div>
    </div>
  );
}
