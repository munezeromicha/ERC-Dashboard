
import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import axios from 'axios';

ChartJS.register(ArcElement, Tooltip, Legend);

interface QueryData {
  _id: string;
  createdAt: string;
}

const PieChart: React.FC = () => {
  const [totalQueries, setTotalQueries] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://wizzy-africa-backend.onrender.com/api/queries');
        const queries: QueryData[] = response.data.data;
        setTotalQueries(queries.length);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const data = {
    labels: ['All'],
    datasets: [
      {
        label: 'Queries',
        data: [totalQueries],
        backgroundColor: ['#4F46E5'],
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
            return `${tooltipItem.label}: ${tooltipItem.raw} queries`;
          },
        },
      },
      legend: {
        display: false,
      },
    },
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center -ml-8">
      <div className="relative w-[180px] h-[180px]">
        <Doughnut data={data} options={options} />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-700">Total Queries</p>
            <p className="text-2xl font-semibold text-gray-900">{totalQueries}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-4 mt-6">
        <div className="flex items-center bg-gray-50 px-3 py-1 rounded-full">
          <div className="w-3 h-3 bg-blue-600 rounded-full mr-2"></div>
          <span className="text-gray-600">All <span className="font-bold">{totalQueries} queries</span></span>
        </div>
      </div>
    </div>
  );
};

export default PieChart;