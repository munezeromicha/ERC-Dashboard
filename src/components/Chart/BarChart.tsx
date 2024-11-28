import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

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
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          toast.error("Please login to view publication data");
          window.location.replace("https://erc-remys-projects-e871eb29.vercel.app/login");
          return;
        }

        const response = await fetch(
          "https://wizzy-africa-backend.onrender.com/api/publication-cards",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 401) {
          toast.error("Session expired. Please login again");
          localStorage.removeItem("token");
          window.location.replace("https://erc-remys-projects-e871eb29.vercel.app/login");
          return;
        }

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const publications: PublicationData[] = await response.json();

        if (!publications || publications.length === 0) {
          console.warn("No publications data received");
          setLoading(false);
          return;
        }

        const groupedData: Record<string, number> = {};
        publications.forEach((pub) => {
          const date = new Date(pub.date).toLocaleDateString();
          groupedData[date] = (groupedData[date] || 0) + 1;
        });

        const labels = Object.keys(groupedData).sort();
        const data = labels.map((date) => groupedData[date]);

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
      } catch (error: unknown) {
        console.error("Error fetching publication data:", error);
        if (
          (error as { response?: { status: number } })?.response?.status === 401
        ) {
          toast.error("Session expired. Please login again");
          localStorage.removeItem("token");
          window.location.replace("https://erc-remys-projects-e871eb29.vercel.app/login");
        } else {
          toast.error("Failed to load publication data");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  return (
    <div className="p-4 bg-white shadow rounded-lg">
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      ) : (
        <>
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Publication Upload Trends
          </h2>
          <Line
            data={chartData}
            options={{
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
            }}
          />
        </>
      )}
    </div>
  );
};

export default PublicationChart;
