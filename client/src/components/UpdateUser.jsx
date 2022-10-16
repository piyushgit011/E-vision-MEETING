import React, { useContext, useRef, useState } from "react";
import { FaImage } from "react-icons/fa";
import { toast } from "react-toastify";
import Multiselect from "multiselect-react-dropdown";
import { classes } from "../data/classOptions";
import { subjects } from "../data/subjectOptions";
import { Store } from "../store";
import instance from "../axios";

export default function UpdateUser({ toggleDrawer }) {
  const { state } = useContext(Store);
  const { userInfo } = state;

  const [data, setData] = useState({
    name: userInfo.name,
    dob: userInfo.dob,
    email: userInfo.email,
    phone: userInfo.phone,
    poster_path: userInfo.poster_path,
    fatherName: userInfo.fatherName,
    motherName: userInfo.motherName,
    address: userInfo.address,
    class: [],
    subjects: [],
  });

  const handleUpdate = async (e) => {
    e.preventDefault();
    // console.log(data);
    let data1 = [];
    let data2 = [];

    const classArray = classRef.current.getSelectedItems();
    const subArray = subjectRef.current.getSelectedItems();

    if (classArray.length > 0) {
      data1 = await classArray.map((obj) => {
        return obj.key;
      });

      setData({...data, class: data1})
    }
    if (subArray.length > 0) {
      data2 = await subArray.map((obj) => {
        return obj.key;
      });

      setData({...data, subjects: data2})
    }

    console.log(data);
    try {
      //   const {data} = await instance.put('user', data);
    } catch (err) {
      console.log(err);
      toast.error("Some error occured, Retry");
    }
    toggleDrawer();
    toast.success("successfully updated");
  };

  const [load, setLoad] = useState(false);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const addImage = (img) => {
    setLoad(true);
    if (img.type === "image/jpeg" || img.type === "image/png") {
      const data = new FormData();
      data.append("file", img);
      data.append("upload_preset", "Garuda");
      data.append("cloud_name", "di5gni2uz");
      fetch("http://api.cloudinary.com/v1_1/di5gni2uz/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          console.log(res.url.toString());
          setData({ ...data, poster_path: res.url.toString() });
          setLoad(false);
        })
        .catch((err) => {
          setLoad(false);
          toast.error("cannot upload image");
        });
    } else {
      setLoad(false);
    }
  };

  const classRef = useRef(null);
  const subjectRef = useRef(null);

  return (
    <div className="bg-siteBg p-10">
      <button
        className="btn text-black font-semibold bgGradient px-5 mx-auto my-3"
        onClick={toggleDrawer}
      >
        Go Back
      </button>
      <form className="text-black box w-[60%]" onSubmit={handleUpdate}>
        <input
          type="email"
          className="block border border-grey-light w-full p-3 rounded mb-4"
          name="email"
          placeholder="Your Email"
          value={data.email}
          onChange={handleChange}
        />
        <input
          type="password"
          className="block border border-grey-light w-full p-3 rounded mb-4"
          name="password"
          placeholder="Enter Password"
          value={data.password}
          onChange={handleChange}
        />
        <input
          type="text"
          className="block border border-grey-light w-full p-3 rounded mb-4"
          name="name"
          placeholder="Full Name"
          value={data.name}
          onChange={handleChange}
        />
        <input
          type="text"
          className="block border border-grey-light w-full p-3 rounded mb-4"
          name="address"
          placeholder="Address"
          value={data.address}
          onChange={handleChange}
        />
        <input
          type="text"
          className="block border border-grey-light w-full p-3 rounded mb-4"
          name="motherName"
          placeholder="Mother's Name"
          value={data.motherName}
          onChange={handleChange}
        />
        <input
          type="text"
          className="block border border-grey-light w-full p-3 rounded mb-4"
          name="fatherName"
          placeholder="Father's Name"
          value={data.fatherName}
          onChange={handleChange}
        />
        <div className="w-full rounded mb-4">
          <p className="text-white text-xl flex gap-2 items-center my-2 font-semibold">
            Select Classes:{" "}
          </p>
          <Multiselect
            displayValue="key"
            onKeyPressFn={function noRefCheck() {}}
            onRemove={function noRefCheck() {}}
            onSearch={function noRefCheck() {}}
            onSelect={function noRefCheck() {}}
            ref={classRef}
            options={classes}
          />
        </div>
        <div className="w-full rounded mb-4">
          <p className="text-white text-xl flex gap-2 items-center my-2 font-semibold">
            Select Subjects:{" "}
          </p>
          <Multiselect
            displayValue="key"
            onKeyPressFn={function noRefCheck() {}}
            onRemove={function noRefCheck() {}}
            onSearch={function noRefCheck() {}}
            onSelect={function noRefCheck() {}}
            ref={subjectRef}
            options={subjects}
          />
        </div>
        <input
          type="date"
          name="dob"
          className="block border border-grey-light w-full p-3 rounded mb-4"
          value={data.dob}
          onChange={handleChange}
        />
        <input
          type="text"
          className="block border border-grey-light w-full p-3 rounded mb-4"
          name="phone"
          placeholder="Phone number"
          value={data.phone}
          onChange={handleChange}
        />
        <label
          htmlFor="imageFile"
          className="text-white text-xl flex gap-2 items-center my-2"
        >
          <FaImage /> Add an image :{" "}
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => addImage(e.target.files[0])}
          className="my-2 text-white"
        />
        <button
          className="btn text-black font-semibold bgGradient px-5"
          type="submit"
        >
          {load ? "loading..." : "Update Info"}
        </button>
      </form>
    </div>
  );
}
