import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {FaMeetup} from 'react-icons/fa'

const locales = {
  "en-US": require("date-fns/locale/en-US"),
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const events = [
  {
    title: "Big Meeting",
    allDay: true,
    start: new Date(2022, 10, 2),
    end: new Date(2022, 10, 3),
  },
  {
    title: "Vacation",
    start: new Date(2022, 10, 4),
    end: new Date(2022, 10, 6),
  },
  {
    title: "Conference",
    start: new Date(2022, 10, 15),
    end: new Date(2022, 10, 17),
  },
];

export default function CalendarItem() {
  const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
  const [allEvents, setAllEvents] = useState(events);

  function handleAddEvent() {
    setAllEvents([...allEvents, newEvent]);
  }

  return (
    <div className="text-black">
      <div className="flex flex-row gap-4 items-center justify-center text-2xl text-siteBlue font-bold text-center my-2 mt-5"><FaMeetup/> Events & Meets</div>
      <Calendar
        localizer={localizer}
        events={allEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500, margin: "30px", border: '4px solid black' }}
      />
    </div>
  );
}
