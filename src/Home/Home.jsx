import { Button } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../Firebase/Authentication/useAuth";

const Home = () => {
  const { user } = useAuth();

  return (
    <div className=" pt-5 bg-white dark:bg-gray-800 min-h-screen">
      <div>
       
      </div>
      {user ? (
        <div>
         <Link to='/addTask' > <Button className="cursor-pointer">Add Task</Button></Link>
        </div>
      ) : (
        <Link>
          <button className="btn text-black">
            Login With Google
          </button>
        </Link>
      )}
    </div>
  );
};

export default Home;
