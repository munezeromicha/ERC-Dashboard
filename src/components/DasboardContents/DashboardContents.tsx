import React from "react";
import { IoSearch } from "react-icons/io5";
import BarChart from "../Chart/BarChart";
import PieChart from "../Chart/PieChart";
import Calendar from "../Calendar/Calendar";
import AppointmentsChart from "../Chart/AppointmentsChart";
const DashboardContent = () => {
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
            title="Articles"
            count="1K"
            trend="2.1%"
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
            count="2K"
            trend="-2.1%"
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

const Widget: React.FC<WidgetProps> = ({
  title,
  count,
  trend,
  customContent,
}) => {
  return (
    <div className="p-4 bg-white text-left">
      <h2 className="text-lg font-semibold">{title}</h2>
      {customContent ? (
        customContent
      ) : (
        <div className="mt-4">
          <div className="text-2xl">{count}</div>
          <div className="text-sm text-green-500">{trend} vs last week</div>
        </div>
      )}
    </div>
  );
};

export default DashboardContent;
