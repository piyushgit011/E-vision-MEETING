import React, { useContext } from "react";
import {
  FaCalendar,
  FaDesktop,
  FaBell,
  FaBook,
  FaCheck,
  FaUser,
} from "react-icons/fa";
import { Store } from "../store";

export default function SideMenuClass({ setRole, setOpen, open }) {

  const { state } = useContext(Store);
  const { userInfo } = state;

  return (
    <div className="flex flex-col items-center p-4 min-h-[90vh] w-[20rem] border-4 border-siteBlue rounded-lg">
      <div className="w-full text-center p-2">
        <h1 className="text-white text-2xl font-bold">WorkPlace</h1>
      </div>
      <div
        className="sideMenuItems border-t"
        onClick={() => {
          setRole(4);
          setOpen(!open);
        }}
      >
        <FaCheck />
        <p className="text-gray-300">{userInfo.person === 'teacher' ? 'Reports' : 'My Report'}</p>
      </div>
      <div
        className="sideMenuItems border-t"
        onClick={() => {
          setRole(1);
          setOpen(!open);
        }}
      >
        <FaCalendar />
        <p className="text-gray-300">Calender</p>
      </div>
      <div
        className="sideMenuItems"
        onClick={() => {
          setRole(0);
          setOpen(!open);
        }}
      >
        <FaDesktop />
        <p className="text-gray-300">Live Meets</p>
      </div>
      <div
        className="sideMenuItems"
        onClick={() => {
          setRole(2);
          setOpen(!open);
        }}
      >
        <FaBell />
        <p className="text-gray-300">Notifications</p>
      </div>
      <div
        className="sideMenuItems"
        onClick={() => {
          setRole(3);
          setOpen(!open);
        }}
      >
        <FaBook />
        <p className="text-gray-300">Assignments</p>
      </div>
    </div>
  );
}
