
import { Button } from "flowbite-react";
import React from "react";
import useAxiosPublic from "../../Hook/AxiosPublic/AxiosPublic";
import useAuth from "./useAuth";

const Login = () => {
const {googleLogin , setUser} = useAuth()
const axiosPublic = useAxiosPublic()

const handleGoogleLogin=()=>{
  googleLogin()
  .then(res => {
    setUser(res.user)
const email = res.user?.email;
const name = res.user?.displayName;
    const userInfo = {
      email ,
      name 
  
    }
    axiosPublic.post('/users' , userInfo)
    .then(res => {
      console.log('User post Req' , res.data)
   
    })
    .catch(error => {
      console.log('error data from post req user' , error)
    })
  })
  .catch(error => {
    console.log('error from google login' , error)
  })
}
  return (
   <Button className="cursor-pointer" onClick={handleGoogleLogin}>Login</Button>
  );
};

export default Login;
