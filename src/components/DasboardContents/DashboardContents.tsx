import React, { useEffect, useState } from "react";
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
  const navigate = useNavigate();

  const axiosInstance = axios.create({
    baseURL: 'https://wizzy-africa-backend.onrender.com/api',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });

  const handleUnauthorized = () => {
    localStorage.removeItem('token');
    navigate('/login');
    toast.error("Session expired. Please login again.");
  };

  useEffect(() => {
    const fetchPublicationCount = async () => {
      try {
        const response = await axiosInstance.get("/publication-cards");
        setPublicationCount(response.data.length);
      } catch (error: any) {
        console.error("Error fetching publication count:", error);
        if (error.response?.status === 401) {
          handleUnauthorized();
        } else {
          toast.error("Failed to fetch publications");
        }
      }
    };

    const fetchAppointmentCount = async () => {
      try {
        const response = await axiosInstance.get("/appointments");
        setAppointmentCount(response.data.length);
      } catch (error: any) {
        console.error("Error fetching appointment count:", error);
        if (error.response?.status === 401) {
          handleUnauthorized();
        } else {
          toast.error("Failed to fetch appointments");
        }
      }
    };

    const fetchQueriesCount = async () => {
      try {
        const response = await axiosInstance.get("/queries");
        setQueriesCount(response.data.count);
      } catch (error: any) {
        console.error("Error fetching queries count:", error);
        if (error.response?.status === 401) {
          handleUnauthorized();
        } else {
          toast.error("Failed to fetch queries");
        }
      }
    };

    // Fetch all data
    const fetchAllData = async () => {
      await Promise.all([
        fetchPublicationCount(),
        fetchAppointmentCount(),
        fetchQueriesCount()
      ]);
    };

    fetchAllData();
  }, [navigate]);

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