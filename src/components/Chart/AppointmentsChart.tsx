import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const AppointmentsChart: React.FC = () => {
  const data = {
    labels: ['01', '02', '03', '04', '05', '06'],
    datasets: [
      {
        label: 'Last 6 days',
        data: [1, 3, 0, 2, 1, 4], 
        fill: false,
        borderColor: '#4F46E5', 
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: '#D1D5DB',
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      <Line data={data} options={options} className='-ml-8'/>
    </div>
  );
};

export default AppointmentsChart;
