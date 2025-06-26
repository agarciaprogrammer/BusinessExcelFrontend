import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Title, Tooltip, Legend);

interface Props {
  dataGAP: Record<string, number>;
}

const CumplimientoGapChart: React.FC<Props> = ({ dataGAP }) => {
  const labels = Object.keys(dataGAP);
  const data = {
    labels,
    datasets: [
      {
        label: "Cumplimiento GAP",
        data: labels.map((label) => dataGAP[label]),
        backgroundColor: ["#4ade80", "#f87171"],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" as const },
      title: { display: true, text: "Cumplimiento de GAP" },
    },
  };

  return <Pie data={data} options={options} />;
}

export default CumplimientoGapChart;