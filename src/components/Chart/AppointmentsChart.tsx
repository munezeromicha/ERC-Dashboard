import React, { useEffect, useState } from 'react';
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

interface Appointment {
  _id: string;
  place: string;
  vehicle: string;
  name: string;
  email: string;
  phoneNumber: string;
  additionalInfo: string;
  __v: number;
}
const AppointmentsChart: React.FC = () => {
  const [chartData, setChartData] = useState<{
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      fill: boolean;
      borderColor: string;
      tension: number;
    }[];
  }>({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch('https://wizzy-africa-backend.onrender.com/api/appointments');
        const appointments: Appointment[] = await response.json();

        const appointmentsByDate = appointments.reduce((acc: { [key: string]: number }, appointment) => {
          const date = new Date(parseInt(appointment._id.substring(0, 8), 16) * 1000);
          const dateStr = date.toLocaleDateString();
          
          acc[dateStr] = (acc[dateStr] || 0) + 1;
          return acc;
        }, {});

        const dates = Object.keys(appointmentsByDate).sort().slice(-6);
        const counts = dates.map(date => appointmentsByDate[date]);

        setChartData({
          labels: dates,
          datasets: [
            {
              label: 'Appointments per day',
              data: counts,
              fill: false,
              borderColor: '#4F46E5',
              tension: 0.4,
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, []);

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
      <Line data={chartData} options={options} className='-ml-8'/>
    </div>
  );
};

export default AppointmentsChart;
