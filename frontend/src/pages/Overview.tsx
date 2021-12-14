import { ArrowNarrowRightIcon } from "@heroicons/react/solid";
import { useNavigate } from "react-router-dom";

export default function Overview() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-green-500 via-green-700 to-green-500 items-center justify-center flex-col gap-5">
      <div className="flex flex-col w-3/4 2xl:w-1/2 bg-white p-10 rounded-xl shadow-2xl">
        <h1 className="font-bold text-4xl pb-5 place-self-center">Overview</h1>
        <p className="text-lg p-4">
          EV Charging is a rapidly growing industry. As the number of EV's on
          the road increases, the infrastructure supporting these cars needs to
          expand as well. Thousands upon thousands of EV Chargers (EVSEs) need
          to be available.
        </p>
        <p className="text-lg p-4">
          However, as the number of EVSEs grows, so does the strain on the
          electrical grid. Therefore an in order to reduce that strain, EV
          drivers need to be incentivized to accept a little less energy (kWh)
          and charge for a little less time.
        </p>
        <p className="text-lg p-4">
          This is a basic walkthrough of how a decentralized reward system would
          work in order to incentivize EV drivers being flexible with charging.
        </p>
      </div>
      <div className="flex flex-row">
        <button
          className="bg-white shadow-lg px-10 py-5 rounded"
          onClick={() => navigate("/terminology")}
        >
          <ArrowNarrowRightIcon className="h-5 w-5 text-green-600" />
        </button>
      </div>
    </div>
  );
}
