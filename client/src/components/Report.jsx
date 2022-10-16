import React, { useContext, useState } from "react";
import { Chart as ChartJS } from "chart.js/auto";
import LineChart from "./LineChart";
import { chartData, emotionData } from "../data/chartJsData";
import { Store } from "../store";

export default function Report() {
  const { state } = useContext(Store);

  const [emotData, setEmotData] = useState({
    labels: emotionData.map((user) => user.name), //labels is x-axis
    datasets: [
      {
        label: "Focus %",
        data: emotionData.map((user) => user.value),
        backgroundColor: [
          "skyblue",
          "lightgreen",
          "blue",
          "yellow",
          "red"
        ],
        borderColor: "green",
      },
    ],
  })

  const [focusData, setFocusData] = useState({
    labels: chartData.map((user) => user.time), //labels is x-axis
    datasets: [
      {
        label: "Focus %",
        data: chartData.map((user) => user.focusRate),
        backgroundColor: [
          "white",
          "blue",
          "skyblue",
          "lightgreen",
          "yellow",
          "red"
        ],
        borderColor: "green",
      },
    ],
  });

  return (
    <div className="flex flex-col my-3 text-black font-bold">
      {/* options */}
      <div className="flex flex-wrap gap-3 justify-around items-center py-3 border-b-4 border-gray-700">
        <input type="date" name="" id="" className="select bgGradient" />
      </div>
      {/* charts */}
      <div className="flex flex-col items-center justify-center gap-10 my-5 py-3">
        <h1 className="text-2xl">Focus Percentage</h1>
        <LineChart chartData={focusData} emotData={emotData}/>
      </div>
    </div>
  );
}