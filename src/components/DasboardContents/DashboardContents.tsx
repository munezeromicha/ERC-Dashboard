import React, { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import BarChart from "../Chart/BarChart";
import PieChart from "../Chart/PieChart";
import Calendar from "../Calendar/Calendar";
import AppointmentsChart from "../Chart/AppointmentsChart";

const DashboardContent = () => {
  const [publicationCount, setPublicationCount] = useState<number>(0);
  const [appointmentCount, setAppointmentCount] = useState<number>(0);

  useEffect(() => {
    const fetchPublicationCount = async () => {
      try {
        const response = await fetch(
          "https://wizzy-africa-backend.onrender.com/api/publication-cards"
        );
        const data = await response.json();
        setPublicationCount(data.length);
      } catch (error) {
        console.error("Error fetching publication count:", error);
      }
    };

    fetchPublicationCount();
  }, []);

  useEffect(() => {
    const fetchAppointmentCount = async () => {
      try {
        const response = await fetch(
          "https://wizzy-africa-backend.onrender.com/api/appointments"
        );
        const data = await response.json();
        setAppointmentCount(data.length);
      } catch (error) {
        console.error("Error fetching publication count:", error);
      }
    };

    fetchAppointmentCount();
  }, []);
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
        <div className="flex flex-col ">
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
            count="2K"
            trend="-2.1%"
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
