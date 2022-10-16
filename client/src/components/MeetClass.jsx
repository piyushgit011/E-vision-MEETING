import React from "react";
import { useState } from "react";

export default function MeetClass() {
  const [meet, setMeet] = useState(false);

  return (
    <div className="flex flex-col text-center text-black items-center justify-center">
      <div>
        <p className="text-2xl font-bold my-5 border-2 border-siteBg p-2 rounded-md">
          Create a new Meet
        </p>
        <label htmlFor="parts" className="text-lg my-3">
          Select participants:
          <select
            name="participants"
            id="parts"
            className="bg-siteBg text-white p-2 rounded-2xl m-3"
          >
            <option value="">Rahul Singhania</option>
            <option value="">Sonia Singh</option>
            <option value="">Pratiksha Phartiyal</option>
          </select>
        </label>
      </div>
      <div className="flex flex-row gap-5">
        <a
          href="http://192.168.230.21:5000/"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-siteBg text-white p-3 rounded-md"
          onClick={() => setMeet(true)}
        >
          Start Meet
        </a>
        <button className="bg-siteBg text-white p-3 rounded-md">
          Share Link
        </button>
      </div>
      <img
        src="https://storage.googleapis.com/gweb-uniblog-publish-prod/images/Google_Meet.max-1100x1100.png"
        alt="meet"
        className="w-1/4 object-contain"
      />
      {meet && (
        <button className="bg-siteBg text-white p-3 rounded-md">
          Check Report
        </button>
      )}
    </div>
  );
}
