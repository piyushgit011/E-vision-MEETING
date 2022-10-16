import React from "react";

export default function AuthSwitch({ isTeacher, setIsTeacher }) {
  return (
    <div className="flex flex-row gap-2 items-center justify-between relative">
      <div
        className={`absolute ${
          !isTeacher ? "translate-x-[100%]" : "translate-x-0"
        } duration-300 left-0 top-0 opacity-80 bgGradient w-[50%] h-[100%] rounded-2xl`}
      />
      <div
        className="cursor-pointer p-2 flex items-center justify-center bg-sitegreen flex-1"
        onClick={() => setIsTeacher(!isTeacher)}
      >
        Student
      </div>
      <div
        className="cursor-pointer p-2 flex items-center justify-center bg-sitegreen flex-1"
        onClick={() => setIsTeacher(!isTeacher)}
      >
        Teacher
      </div>
    </div>
  );
}
