import { Button } from "flowbite-react";
import React from "react";
import { FaGoogle, FaHome } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosPublic from "../../Hook/AxiosPublic/AxiosPublic";
import useAuth from "./useAuth";

const LoginPage = () => {
  const { googleLogin, setUser } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    googleLogin()
      .then((res) => {
        const email = res.user?.email;
        const name = res.user?.displayName;
        const userInfo = {
          email,
          name,
        };
        axiosPublic
          .post("/users", userInfo)
          .then((res) => {
            console.log("User post Req", res.data);
          })
          .catch((error) => {
            console.log("error data from post req user", error);
          });
        Swal.fire("Login Successfully");
        navigate("/task");
      })
      .catch((error) => {
        console.log("error from google login", error);
      });
  };
  return (
    <div className="min-h-screen bg-gradient-to-r  from-purple-700 to-purple-300 flex flex-col justify-center items-center">
      <Button
        color="purple"
        className=" px-10 py-4 cursor-pointer flex justify-center items-center "
        onClick={handleGoogleLogin}
      >
        <FaGoogle className="mt-1 mr-2" />
        <h1>Login</h1>
      </Button>
      <Link
        to="/"
        color="purple"
        className=" mt-10 px-10 py-4 cursor-pointer flex justify-center items-center border-2 border-purple-700 rounded-4xl"
      >
        <FaHome className=" text-white mr-2" />
        <h1 className="text-white">Home</h1>
      </Link>
    </div>
  );
};

export default LoginPage;
