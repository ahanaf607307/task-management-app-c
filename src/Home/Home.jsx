import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../Firebase/Authentication/useAuth";

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="pt-24 bg-white dark:bg-gray-800 min-h-screen">
      <div>
       
      </div>
      {user ? (
        <h1 className="text-5xl text-black ">User Login Now</h1>
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
