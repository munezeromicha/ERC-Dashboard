import React, { useEffect, useMemo, useState } from "react";
import { IoSearch } from "react-icons/io5";
import BarChart from "../Chart/BarChart";
import PieChart from "../Chart/PieChart";
import Calendar from "../Calendar/Calendar";
import AppointmentsChart from "../Chart/AppointmentsChart";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";

const DashboardContent = () => {
  const [publicationCount, setPublicationCount] = useState<number>(0);
  const [appointmentCount, setAppointmentCount] = useState<number>(0);
  const [queriesCount, setQueriesCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();


  const token = useMemo(() => localStorage.getItem('token'), []);


  const axiosInstance = useMemo(() => {
    console.log('Creating axios instance with token:', token); 
    return axios.create({
      baseURL: 'https://wizzy-africa-backend.onrender.com/api',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
  }, [token]);


  axiosInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
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
    console.log('Handling unauthorized access'); 
    localStorage.removeItem('token');
    navigate('/login');
    toast.error("Session expired. Please login again.");
  };

  useEffect(() => {
    const fetchData = async () => {
      console.log('Starting data fetch with token:', token); 

      if (!token) {
        console.log('No token found in fetchData'); 
        handleUnauthorized();
        return;
      }

      setLoading(true);

      try {
        const [publicationsRes, appointmentsRes, queriesRes] = await Promise.all([
          axiosInstance.get("/publication-cards"),
          axiosInstance.get("/appointments"),
          axiosInstance.get("/queries")
        ]);

        console.log('API Responses:', { 
          publications: publicationsRes.data,
          appointments: appointmentsRes.data,
          queries: queriesRes.data
        });

        setPublicationCount(publicationsRes.data.length);
        setAppointmentCount(appointmentsRes.data.length);
        setQueriesCount(queriesRes.data.length);
      } catch (error: any) {
        console.error('Error details:', error.response || error); 
        if (error.response?.status === 401) {
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
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg">Loading dashboard data...</div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-8 bg-[#FFFFFF]">
      <header className="flex flex-col gap-14">
        <div className="relative w-[60%] flex justify-between">
          <input
            type="text"
            placeholder="Search"
            className="bg-[#f7f6fb] px-10 py-2 rounded-lg w-full text-[#627B87]"
          />
          <button aria-label="Search">
            <IoSearch className="absolute right-3 top-3 text-gray-500 text-[#627B87]" />
          </button>
        </div>
        <h1 className="text-2xl font-bold text-[#1F384C] text-left">
          Dashboard
        </h1>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-16 mt-6">
        <div className="flex flex-col">
          <Widget
            title="Publications statistics"
            count={`${publicationCount}`}
            trend=""
            customContent={undefined}
          />
          <BarChart />
        </div>
        <div>
          <Widget
            title="Queries"
            count={`${queriesCount}`}
            customContent={undefined}
          />
          <PieChart />
        </div>

        <Widget
          title="Calendar"
          customContent={<Calendar />}
          count={undefined}
          trend={undefined}
        />
        <div>
          <Widget
            title="Appointments"
            count={`${appointmentCount}`}
            customContent={undefined}
          />
          <AppointmentsChart />
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
    <div className="p-4 bg-white text-left">
      <h2 className="text-lg font-semibold">{title}</h2>
      {customContent ? (
        customContent
      ) : (
        <div className="mt-4">
          <div className="text-2xl font-bold text-blue-900">{count}</div>
        </div>
      )}
    </div>
  );
};

export default DashboardContent;