import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";


ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface PublicationData {
  date: string;
  count: number;
}

const PublicationChart: React.FC = () => {
  const [chartData, setChartData] = useState({
    labels: [] as string[],
    datasets: [
      {
        label: "Publications Uploaded",
        data: [] as number[],
        borderColor: "#4f46e5", 
        backgroundColor: "rgba(79, 70, 229, 0.2)", 
        tension: 0.4, 
      },
    ],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://wizzy-africa-backend.onrender.com/api/publication-cards");
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const publications: PublicationData[] = await response.json();

        console.log('Fetched publications:', publications);
        
        if (!publications || publications.length === 0) {
          console.warn('No publications data received');
          setLoading(false);
          return;
        }

        const groupedData: Record<string, number> = {};
        publications.forEach((pub) => {
          const date = new Date(pub.date).toLocaleDateString();
          groupedData[date] = (groupedData[date] || 0) + 1;
        });


        console.log('Grouped data:', groupedData);


        const labels = Object.keys(groupedData).sort();
        const data = labels.map((date) => groupedData[date]);

        console.log('Chart data:', { labels, data });

        setChartData((prevData) => ({
          ...prevData,
          labels,
          datasets: [
            {
              ...prevData.datasets[0],
              data,
            },
          ],
        }));
      } catch (error) {
        console.error("Error fetching publication data:", error);

      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log('Current loading state:', loading);
    console.log('Current chart data:', chartData);
  }, [loading, chartData]);

  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Publication Upload Trends</h2>
      <Line data={chartData} options={{
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: "top",
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: "Date",
            },
          },
          y: {
            title: {
              display: true,
              text: "Number of Publications",
            },
          },
        },
      }} />
    </div>
  );
};

export default PublicationChart;
