import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart: React.FC = () => {
  const data = {
    labels: ['Afternoon', 'Evening', 'Morning'],
    datasets: [
      {
        label: 'Orders',
        data: [40, 32, 28],
        backgroundColor: ['#4F46E5', '#6366F1', '#A5B4FC'],
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    cutout: '70%',
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem: any) {
            return `${tooltipItem.label}: ${tooltipItem.raw}%`;
          },
        },
      },
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="flex flex-col items-center -ml-8">
      <div className="relative w-[150px] h-[150px]">
        <Doughnut data={data} options={options} />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-700">Queries</p>
            <p className="text-2xl font-semibold text-gray-900">1,890</p>
          </div>
        </div>
      </div>

      <div className="flex space-x-8 mt-4">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-blue-600 mr-2"></div>
          <span className="text-gray-600">Afternoon <span className="font-bold">40%</span></span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-indigo-400 mr-2"></div>
          <span className="text-gray-600">Evening <span className="font-bold">32%</span></span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-indigo-200 mr-2"></div>
          <span className="text-gray-600">Morning <span className="font-bold">28%</span></span>
        </div>
      </div>
    </div>
  );
};

export default PieChart;
