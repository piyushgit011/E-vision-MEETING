import React, { useState } from "react";
import CalenderClass from "../components/CalenderClass";
import MeetClass from "../components/MeetClass";
import Notifications from "../components/Notifications";
import SideMenuClass from "../components/SideMenuClass";
import Works from "../components/Works";
import { BsMenuButton } from "react-icons/bs";
import Report from "../components/Report";
import CalendarItem from "../components/CalendarItem";

export default function Class() {
  const [role, setRole] = useState(0);
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full m-h-[100vh] box flex md:flex-row flex-col gap-5 my-10 relative">
      <div
        className="text-white text-2xl md:hidden self-end"
        onClick={() => setOpen(!open)}
      >
        <BsMenuButton />
      </div>
      {/* sidebar */}
      <div
        className={`md:block md:relative z-300 absolute left-0 bg-siteBg ${
          open ? "translate-x-[0%]" : "translate-x-[-100%]"
        } duration-300 md:translate-x-0`}
      >
        <SideMenuClass setRole={setRole} setOpen={setOpen} open={open} />
      </div>
      {/* main portion */}
      <div className="flex-1 w-full border-4 rounded-lg text-white bg-white border-siteBlue">
        {role === 0 ? (
          <MeetClass />
        ) : role === 1 ? (
          <CalendarItem/>
        ) : role === 2 ? (
          <Notifications />
        ) : role === 3 ? (
          <Works />
        ) : (
          <Report />
        )}
      </div>
    </div>
  );
}
