import React, { useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Store } from "../store";
import { Drawer } from "@mui/material";
import UpdateUser from "./UpdateUser";

export default function UserProfile() {
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;
  const navigate = useNavigate();

  const [bottom, setBottom] = useState(false);

  const toggleDrawer = () => {
    setBottom(!bottom);
  };

  const handleLogout = () => {
    localStorage.clear();
    dispatch({ type: "SIGN_OUT" });
    navigate("/");
  };

  return (
    <div className="flex flex-col gap-5 box">
      {/* image */}
      <div className="flex flex-row gap-5 justify-center items-center">
        <button className="btn bgGradient text-siteBg px-4">Email</button>
        <img
          src={userInfo.poster_path}
          alt="userImage"
          className="w-64 rounded-full"
        />
        <button className="btn bgGradient text-siteBg px-4" onClick={toggleDrawer}>Update</button>
      </div>
      {/* details */}
      <div className="flex flex-col items-center gap-3 justify-center text-white text-lg">
        <div className="user">
          <p>Name:</p>
          <p>{userInfo.name}</p>
        </div>
        <div className="user">
          <p>Role:</p>
          <p>{userInfo.person}</p>
        </div>
        <div className="user">
          <p>Father's name:</p>
          <p>{userInfo.fatherName}</p>
        </div>
        <div className="user">
          <p>Mother's name:</p>
          <p>{userInfo.motherName}</p>
        </div>
        <div className="user">
          <p>Phone Number:</p>
          <p>+91 {userInfo.phone}</p>
        </div>
        <div className="user">
          <p>DOB:</p>
          <p>{userInfo.dob}</p>
        </div>
        <div className="user">
          <p>Address:</p>
          <p>{userInfo.address}</p>
        </div>
        <div className="user">
          <p>Classes:</p>
          {userInfo.class && userInfo.class.length > 0 ? (
            <p>
              {userInfo.class.map((Number) => (
                <span>{Number}, </span>
              ))}
            </p>
          ) : (
            "Not specified"
          )}
        </div>
        <button
          className="btn bgGradient text-siteBg px-4"
          onClick={handleLogout}
        >
          Log Out
        </button>
      </div>
      {/* org form */}
      <Drawer anchor={"bottom"} open={bottom} onClose={toggleDrawer}>
        <UpdateUser toggleDrawer={toggleDrawer}/>
      </Drawer>
    </div>
  );
}
