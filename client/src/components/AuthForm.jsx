import React from "react";
import { toast } from "react-toastify";
import {FaImage} from 'react-icons/fa'

export default function AuthForm({
  handleRegister,
  register,
  userData,
  handleChange,
  handleLogin,
  load,
  setLoad,
  setUserData,
}) {
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
        .then((data) => {
          console.log(data.url.toString());
          setUserData({ ...userData, poster_path: data.url.toString() });
          setUserData({...userData, model_images: [...userData.model_images, data.url.toString()]})
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
  return (
    <form
      className="text-black"
      onSubmit={register ? handleRegister : handleLogin}
    >
      <input
        type="email"
        className="block border border-grey-light w-full p-3 rounded mb-4"
        name="email"
        placeholder="Your Email"
        value={userData.email}
        onChange={handleChange}
      />
      <input
        type="password"
        className="block border border-grey-light w-full p-3 rounded mb-4"
        name="password"
        placeholder="Enter Password"
        value={userData.password}
        onChange={handleChange}
      />
      {register ? (
        <>
          <input
            type="password"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={userData.confirmPassword}
            onChange={handleChange}
          />
          <input
            type="text"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="name"
            placeholder="Full Name"
            value={userData.name}
            onChange={handleChange}
          />
          <input
            type="text"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="address"
            placeholder="Address"
            value={userData.address}
            onChange={handleChange}
          />
          <input
            type="number"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="phone"
            placeholder="Phone number"
            value={userData.phone}
            onChange={handleChange}
          />
          <label
            htmlFor="imageFile"
            className="text-white text-xl flex gap-2 items-center my-2"
          >
            <FaImage /> Add at least 4 images :{" "}
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => addImage(e.target.files[0])}
            className='my-2 text-white'
          />
        </>
      ) : (
        <></>
      )}
      <button
        className="btn text-black font-semibold bgGradient px-5"
        type="submit"
      >
        {load ? "loading..." : register ? "Sign Up" : "Log In"}
      </button>
    </form>
  );
}
