import React, { useState } from "react";
import { Calendar } from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function CalenderClass() {
  const [date, setDate] = useState(new Date());
  return (
    <div className="bg-white w-full h-full flex flex-col items-center py-5 gap-3 text-black mx-auto">
      <h1 className="text-center text-2xl font-bold">Track The Dates!</h1>
      <div className="calendar-container w-full flex items-center justify-center">
        <Calendar onChange={setDate} value={date} />
      </div>
      <p className="text-center">
        <span className="bold">Selected Date:</span> {date.toDateString()}
      </p>
    </div>
  );
}
