import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import React from "react";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const Chart = ({ labels, datasets }) => {
  // const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'November', 'December']

  const data = {
    labels,
    datasets: datasets
  };

  const options = {
    scales: {
      y: {
        ticks: {
          beginAtZero: true,
          callback: function (label, index, labels) {
            // when the floored value is the same as the value we have a whole number
            if (Math.floor(label) === label) {
              return label;
            }

          },
        }
      },
    },
  }

  return (
    <Bar
      data={data}
      options={options}
    />
  )
}

export default React.memo(Chart)