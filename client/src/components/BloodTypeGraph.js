import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from "chart.js";

// Register the required scale types and elements
Chart.register(CategoryScale, LinearScale, BarElement, Tooltip);

const BloodTypeChart = ({ bloodTypeCounts }) => {
  const [chartData, setChartData] = useState({
    labels: Object.keys(bloodTypeCounts),
    datasets: [
      {
        label: "Blood Type Counts",
        data: new Array(Object.keys(bloodTypeCounts).length).fill(0),
        backgroundColor: "#EF9696",
        borderColor: "#D81414",
        borderWidth: 2,
      },
    ],
  });

  useEffect(() => {
    const animationDuration = 50;
    const interval = 5;
    const totalCounts = Object.values(bloodTypeCounts);

    const updateChartData = () => {
      const step = interval / animationDuration;
      let currentCounts = [...chartData.datasets[0].data];

      const animationTimer = setInterval(() => {
        currentCounts = currentCounts.map((count, index) => {
          return Math.min(count + step, totalCounts[index]);
        });

        setChartData((prevChartData) => {
          return {
            ...prevChartData,
            datasets: [
              {
                ...prevChartData.datasets[0],
                data: currentCounts,
              },
            ],
          };
        });

        if (
          currentCounts.every(
            (count, index) =>
              count === totalCounts[index] || totalCounts[index] === null
          )
        ) {
          clearInterval(animationTimer);
        }
      }, interval);
    };

    updateChartData();
  }, [bloodTypeCounts]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Blood Type Counts",
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const labelIndex = context.dataIndex;
            const dataset = context.dataset.data[labelIndex];
            return `Count: ${dataset}`;
          },
        },
      },
    },
    scales: {
      x: {
        type: "category",
        title: {
          display: true,
          text: "Blood Types",
        },
      },
      y: {
        beginAtZero: true,
        stepSize: 1,
        title: {
          display: true,
          text: "Counts",
        },
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default BloodTypeChart;
