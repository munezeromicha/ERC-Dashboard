import React, { useEffect, useMemo, useState } from "react";
import BarChart from "../Chart/BarChart";
import PieChart from "../Chart/PieChart";
import Calendar from "../Calendar/Calendar";
import AppointmentsChart from "../Chart/AppointmentsChart";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
import { getAuthToken } from "../../utils/auth";
import { MoonLoader } from "react-spinners";

const DashboardContent = () => {
  const [publicationCount, setPublicationCount] = useState<number>(0);
  const [appointmentCount, setAppointmentCount] = useState<number>(0);
  const [queriesCount, setQueriesCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const token = useMemo(() => getAuthToken(), []);

  const axiosInstance = useMemo(() => {
    return axios.create({
      baseURL: "https://wizzy-africa-backend.onrender.com/api",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }, [token]);

  axiosInstance.interceptors.request.use(
    (config) => {
      const currentToken = getAuthToken();
      if (currentToken) {
        config.headers.Authorization = `Bearer ${currentToken}`;
      } else {
        handleUnauthorized();
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const handleUnauthorized = () => {
    import("js-cookie").then((Cookies) => {
      Cookies.default.remove("auth_token", { path: "/" });
      window.location.replace("https://erc-remys-projects-e871eb29.vercel.app/login");
      toast.error("Session expired. Please login again.");
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!token) {
        handleUnauthorized();
        return;
      }

      setLoading(true);

      try {
        const [publicationsRes, appointmentsRes, queriesRes] =
          await Promise.all([
            axiosInstance.get("/publication-cards"),
            axiosInstance.get("/appointments"),
            axiosInstance.get("/queries"),
          ]);

        setPublicationCount(publicationsRes.data.length);
        setAppointmentCount(appointmentsRes.data.length);
        setQueriesCount(queriesRes.data.count);
      } catch (error: unknown) {
        const axiosError = error as { response?: { status: number } };
        console.error("Error details:", axiosError.response || error);
        if (axiosError.response?.status === 401) {
          handleUnauthorized();
        } else {
          toast.error("Failed to fetch data");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token, axiosInstance, navigate]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-20">
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <MoonLoader color="#1F384C" size={50} />
          <span className="text-gray-500 text-sm mt-4">Loading dashboard...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-20">
      <header className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#1F384C] text-center sm:text-left">
          Dashboard
        </h1>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
        <div className="flex flex-col space-y-4">
          <Widget
            title="Publications statistics"
            count={`${publicationCount}`}
            trend=""
            customContent={undefined}
          />
          <div className="bg-white rounded-lg shadow-sm p-4 h-[300px]">
            <BarChart />
          </div>
        </div>

        <div className="flex flex-col space-y-4">
          <Widget
            title="Queries"
            count={`${queriesCount}`}
            customContent={undefined}
          />
          <div className="bg-white rounded-lg shadow-sm p-4 h-[300px]">
            <PieChart />
          </div>
        </div>

        <div className="flex flex-col space-y-4">
          <Widget
            title="Calendar"
            customContent={<Calendar />}
            count={undefined}
            trend={undefined}
          />
        </div>

        <div className="flex flex-col space-y-4">
          <Widget
            title="Appointments"
            count={`${appointmentCount}`}
            customContent={undefined}
          />
          <div className="bg-white rounded-lg shadow-sm p-4 h-[300px]">
            <AppointmentsChart />
          </div>
        </div>
      </div>
    </div>
  );
};

interface WidgetProps {
  title: string;
  count?: string;
  trend?: string;
  customContent?: React.ReactNode;
}

const Widget: React.FC<WidgetProps> = ({ title, count, customContent }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
      <h2 className="text-lg sm:text-xl font-semibold text-[#1F384C]">
        {title}
      </h2>
      {customContent ? (
        customContent
      ) : (
        <div className="mt-4">
          <div className="text-2xl sm:text-3xl font-bold text-blue-900">
            {count}
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardContent;