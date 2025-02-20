import { DarkThemeToggle, Navbar } from "flowbite-react";
import React from "react";
import { Link, NavLink } from "react-router-dom";
import Login from "../../Firebase/Authentication/Login";
import useAuth from "../../Firebase/Authentication/useAuth";

const AppNavbar = () => {
  const {user  , logoutUser} = useAuth()


  const handleLogoutUser = () => {
    logoutUser()
  }
  return (
   

   <div >
     <Navbar  className="bg-[#8454c0] dark:bg-[#8454c0]">
    <Navbar.Brand >
     <Link className="text-white font-black text-xl dark:text-white"><button>Task Now</button></Link>
    </Navbar.Brand>
    <div className="flex md:order-2">
    <div className="mr-3 hidden md:flex"> <DarkThemeToggle className="bg-white/90" /></div>
      {
        user ?  <button onClick={handleLogoutUser} className="cursor-pointer border-2 border-white px-2 py-1 rounded-md text-white hover:scale-105 duration-150" >Logout</button> : <button className="cursor-pointer border-2 border-white px-2 py-1 rounded-md text-white hover:scale-105 duration-150" ><Login/></button>
      }
      
      <Navbar.Toggle />
    </div>
    <Navbar.Collapse>
      <NavLink className={({ isActive, isPending }) =>
    isPending ? "text-white" : isActive ? "text-[#d8a1dd]" : "text-black"
  } to='/'>Home</NavLink>
      <NavLink className={({ isActive, isPending }) =>
    isPending ? "text-white" : isActive ? "text-[#d8a1dd]" : "text-black"
  } to='/addTask'>Add Task</NavLink>
  <div className="mr-3 flex md:hidden"> <DarkThemeToggle /></div>
    </Navbar.Collapse>
  </Navbar>
   </div>

  );
};

export default AppNavbar;
