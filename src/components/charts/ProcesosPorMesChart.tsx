import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface Props {
  procesosPorMes: Record<string, number>;
  title: string;
}

const ProcesosPorMesChart: React.FC<Props> = ({ procesosPorMes, title }) => {
  const labels = Object.keys(procesosPorMes);
  const data = {
    labels,
    datasets: [
      {
        label: "Cantidad de procesos",
        data: labels.map((label) => procesosPorMes[label]),
        backgroundColor: "rgba(59, 130, 246, 0.7)", // Tailwind blue-500
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" as const },
      title: { display: true, text: title },
    },
  };

  return <Bar data={data} options={options} />;
};

export default ProcesosPorMesChart;
