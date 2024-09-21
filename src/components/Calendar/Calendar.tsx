import React, { useState } from "react";
import dayjs from "dayjs";
import { FaCaretLeft } from "react-icons/fa";
import { FaCaretRight } from "react-icons/fa";

interface CalendarProps {}

const Calendar: React.FC<CalendarProps> = () => {
  const [currentDate, setCurrentDate] = useState(dayjs());

  const daysOfWeek = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

  const startOfMonth =
    currentDate.startOf("month").day() === 0
      ? 7
      : currentDate.startOf("month").day(); 
  const daysInMonth = currentDate.daysInMonth();

  const daysArray = Array.from(
    { length: daysInMonth },
    (_, index) => index + 1
  );

  const isToday = (day: number) => {
    return dayjs().isSame(currentDate.date(day), "day");
  };

  return (
    <div className="w-72 bg-blue-600 rounded-lg p-4 text-white">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">
          {currentDate.format("MMMM YYYY")}
        </h2>
        <div className="flex space-x-2">
          <button
            className="p-1 text-gray-200 hover:text-white"
            onClick={() => setCurrentDate(currentDate.subtract(1, "month"))}
          >
            <FaCaretLeft />
          </button>
          <button
            className="p-1 text-gray-200 hover:text-white"
            onClick={() => setCurrentDate(currentDate.add(1, "month"))}
          >
            <FaCaretRight />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 text-sm text-center">
        {daysOfWeek.map((day, index) => (
          <div key={index} className="font-medium">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-y-2 text-center mt-2">
        {Array.from({ length: startOfMonth - 1 }).map((_, index) => (
          <div key={index}></div>
        ))}

        {daysArray.map((day) => (
          <div
            key={day}
            className={`p-2 rounded-full ${
              isToday(day)
                ? "bg-white text-blue-600 font-bold"
                : "hover:bg-blue-500"
            }`}
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
