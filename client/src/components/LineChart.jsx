import React from "react";
import { Line, Pie } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

export default function LineChart({ chartData, emotData }) {
  console.log(chartData);
  return (
    <div style={{ width: "70%", margin: "auto" }}>
      <Line data={chartData} />
      <h1 className="text-2xl text-center my-3 mt-10">Emotions Index</h1>
      <Pie data={emotData} />
    </div>
  );
}
