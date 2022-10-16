import React, { useContext, useState } from "react";
import AuthForm from "../components/AuthForm";
import AuthSwitch from "../components/AuthSwitch";
import { useNavigate } from "react-router-dom";
import instance from "../axios";
import { Store } from "../store";
import { toast } from "react-toastify";

export default function Auth() {
  const navigate = useNavigate();

  const { dispatch } = useContext(Store);

  const [isTeacher, setIsTeacher] = useState(true);
  const [register, setRegister] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
    poster_path:
      "https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg",
    model_images: [],
    person: "student",
  });
  const [load, setLoad] = useState(false);

  // const validator = () => {
  //   if (
  //     userData.email === "" ||
  //     userData.address === "" ||
  //     userData.password === "" ||
  //     userData.name === "" ||
  //     userData.phone === ""
  //   )
  //     return true;
  //   return false;
  // };
  
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    console.log(userData)
    if (userData.password !== userData.confirmPassword) {
      toast.error("Password and Confirm password do not match");
      return;
    }

    // if (validator) {
    //   toast.error("Kindly fill all required fields");
    //   return;
    // }

    if (isTeacher) userData.person = "teacher";
    else userData.person = "student";

    const postData = {
      name: userData.name,
      person: userData.person,
      password: userData.password,
      email: userData.email,
      phone: userData.phone,
      poster_path: userData.poster_path,
      address: userData.address,
    };
    try {
      const { data } = await instance.post("user", postData);

      localStorage.setItem('user', JSON.stringify(data));
      dispatch({ type: "SIGN_IN", payload: data });
      toast.success("Welcome! Successfully signed In");
      navigate("/");
    } catch (err) {
      console.log(err)
      toast.error("Can't authorize, try again!");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (userData.email === "" || userData.password === "") {
      toast.error("Kindly fill all required fields");
      return;
    }
    try {
      const postData = {
        email: userData.email,
        password: userData.password,
      };
      const { data } = await instance.post("user/login", postData);

      localStorage.setItem('user', JSON.stringify(data));
      dispatch({ type: "SIGN_IN", payload: data });
      toast.success("Welcome! Successfully signed In");
      navigate("/");
    } catch (err) {
      toast.error(err);
    }
    reset();
  };

  const reset = () => {
    setUserData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      address: "",
      localAdminId: "",
      model_images: []
    });
  };
  
  return (
    <div className="box text-white mt-32 flex justify-center items-center">
      <div className="flex flex-col gap-3 lg:w-[40vw] border-4 p-4 rounded-xl">
        {/* top switch */}
        {/* <AuthSwitch isTeacher={isTeacher} setIsTeacher={setIsTeacher} /> */}
        {/* form */}
        <AuthForm
          handleRegister={handleRegister}
          handleLogin={handleLogin}
          register={register}
          userData={userData}
          handleChange={handleChange}
          load={load}
          setLoad={setLoad}
          setUserData={setUserData}
        />
        {/* register or login */}
        <div>
          {register ? (
            <div>
              <p>
                By signing up, you agree to the{" "}
                <span className="text-blue-400 hover:underline cursor-pointer">
                  Terms of Service
                </span>{" "}
                and{" "}
                <span className="text-blue-400 hover:underline cursor-pointer">
                  Privacy Policy
                </span>
              </p>
              <p className="my-2">
                Already registered?{" "}
                <span
                  className="text-blue-400 hover:underline cursor-pointer"
                  onClick={() => setRegister(!register)}
                >
                  {" "}
                  Log In
                </span>
              </p>
            </div>
          ) : (
            <p>
              Don't have an account?
              <span
                className="text-blue-400 hover:underline cursor-pointer"
                onClick={() => setRegister(!register)}
              >
                {" "}
                Sign Up
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
