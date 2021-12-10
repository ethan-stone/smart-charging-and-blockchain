import React, { useState } from "react";
import "./App.css";
import "./index.css";

function App() {
  const [timeRequest, setTimeRequest] = useState<number>();
  const [energyRquest, setEnergyRequest] = useState<number>();
  const [maxGridOutput, setMaxGridOut] = useState<number>();
  const [gridUsage, setGridUsage] = useState<number>();
  const [flexibility, setFlexibility] = useState<boolean>(false);

  const inputStyles =
    "p-2 shadow border border-black rounded font-bold focus:ring-2 focus:outline-none focus:border-transparent focus:ring-black";

  const inputCardStyles = "grid grid-cols-1 items-center justify-center gap-4";

  const h1Styles = "text-center text-md font-bold";

  const flexibilityClickedStyles = `border-2 border-green-600 py-3 px-10 rounded text-lg font-bold`;

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-green-500 via-green-700 to-green-500 items-center justify-center">
      <div className="grid grid-cols-2 w-3/4 2xl:w-1/2 bg-white p-10 rounded-xl shadow-2xl">
        <div className="grid grid-cols-1 gap-8 p-4">
          <div className={inputCardStyles}>
            <h1 className={h1Styles}>Length of Charge Requested (Minutes)</h1>
            <input
              className={inputStyles}
              type="number"
              placeholder="minutes"
              onChange={(e) => setTimeRequest(parseInt(e.target.value))}
              value={timeRequest}
            />
          </div>
          <div className={inputCardStyles}>
            <h1 className={h1Styles}>Amount of Energy Requested (kWh)</h1>
            <input
              className={inputStyles}
              type="number"
              placeholder="kWh"
              onChange={(e) => setEnergyRequest(parseInt(e.target.value))}
              value={energyRquest}
            />
          </div>
          <div className={inputCardStyles}>
            <h1 className={h1Styles}>Max Grid Output (kW)</h1>
            <input
              className={inputStyles}
              type="number"
              placeholder="kW"
              onChange={(e) => setMaxGridOut(parseInt(e.target.value))}
              value={maxGridOutput}
            />
          </div>
          <div className={inputCardStyles}>
            <h1 className={h1Styles}>Grid Usage (kW)</h1>
            <input
              className={inputStyles}
              type="number"
              placeholder="kW"
              onChange={(e) => setGridUsage(parseInt(e.target.value))}
              value={gridUsage}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 p-4">
          <div className="flex flex-col gap-4 items-center justify-center text-lg font-bold">
            <div>Offer Flexibility?</div>
            <div className="flex flex-row gap-10">
              <button
                className={`${flexibilityClickedStyles} ${
                  flexibility
                    ? "bg-gradient-to-r from-green-700 to-green-500 text-white"
                    : "text-green-600"
                }`}
                onClick={() => setFlexibility(true)}
              >
                Yes
              </button>
              <button
                className={`${flexibilityClickedStyles} ${
                  !flexibility
                    ? "bg-gradient-to-r from-green-700 to-green-500 text-white"
                    : "text-green-600"
                }`}
                onClick={() => setFlexibility(false)}
              >
                No
              </button>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <button className="py-5 px-10 bg-gradient-to-r from-green-700 to-green-500 text-white rounded-lg font-bold">
              Start Charge
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
