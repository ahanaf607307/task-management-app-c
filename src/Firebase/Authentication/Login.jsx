import { Button } from "flowbite-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../../Hook/AxiosPublic/AxiosPublic";
import useAuth from "./useAuth";

const Login = () => {
  const { googleLogin, setUser } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate()

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
          navigate('/task')
      })
      .catch((error) => {
        console.log("error from google login", error);
      });
  };
  return (
   <div className="min-h-screen flex flex-col justify-center items-center">
     <Button className="cursor-pointer" onClick={handleGoogleLogin}>
      Login
    </Button>
   </div>
  );
};

export default Login;
