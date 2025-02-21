import React from "react";
import { Link } from "react-router-dom";
import Drag from "../Components/Drag";
import Login from "../Firebase/Authentication/Login";
import useAuth from "../Firebase/Authentication/useAuth";

const Home = () => {
  const { user } = useAuth();

  return (
    <div className=" pt-5 bg-white dark:bg-gray-800 min-h-screen">
     <div className="max-w-7xl mx-auto">
     <div >
       
       </div>
       {user ? (
         <div>
          
          <h1 className="text-center text-4xl font-bold text-black dark:text-white">Make Your Day</h1>
          <Drag/>
         </div>
       ) : (
         <div className="min-h-screen flex flex-col justify-center items-center">
          <Link color="purple">
          <Login/>
         </Link>
         </div>
       )}
     </div>
    </div>
  );
};

export default Home;
