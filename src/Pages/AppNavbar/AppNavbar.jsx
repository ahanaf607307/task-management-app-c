import { DarkThemeToggle, Navbar } from "flowbite-react";
import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../Firebase/Authentication/useAuth";
import logo from '../../assets/logo.png';

const AppNavbar = () => {
  const {user  , logoutUser , loading} = useAuth()
  const navigate = useNavigate()


  const handleLogoutUser = () => {
    logoutUser()
    .then(res => {
      Swal.fire('Logout successfull')
      navigate('/loginPage')
    })
    .catch(err => {
      console.log(err)
    })

  }
  return (
   

   <div >
     <Navbar  className="bg-[#8454c0] dark:bg-[#8454c0] fixed w-full z-30  top-0">
    <Navbar.Brand >
     <Link to={`/`} className="text-white font-black text-xl dark:text-white cursor-pointer flex gap-x-2"><img src={logo} className="w-10" alt="" /><button className="cursor-pointer">Task Now</button></Link>
    </Navbar.Brand>
    <div className="flex md:order-2">
    <div className="mr-3 hidden md:flex cursor-pointer"> <DarkThemeToggle className="bg-white/90 cursor-pointer" /></div>
      {
       user ?  <button onClick={handleLogoutUser} className="cursor-pointer border-2 border-white px-2 py-1 rounded-md text-white hover:scale-105 duration-150" >Logout</button> : <Link to='/loginPage'><button className="cursor-pointer border-2 border-white px-2 py-1 rounded-md text-white hover:scale-105 duration-150" >Login</button> </Link> 
      }
      
      <Navbar.Toggle />
    </div>
    <Navbar.Collapse className="lg:flex justify-center items-center my-5">
      <NavLink className={({ isActive, isPending }) =>
    isPending ? "text-white" : isActive ? "text-[#ffffff] border-2 border-t-2 border-l-0 border-r-0 border-b-[#ffffff]   rounded-md" : "text-white"
  } to='/'>Home</NavLink>
  
      {
        user? <NavLink className={({ isActive, isPending }) =>
          isPending ? "text-white" : isActive ? "text-[#ffffff] border-2 border-t-2 border-l-0 border-r-0 border-b-[#ffffff]   rounded-md " : "text-white"
        } to='/task'>Your Task</NavLink> : ''
      }
      {
        user? <NavLink className={({ isActive, isPending }) =>
          isPending ? "text-white" : isActive ? "text-[#ffffff] border-2 border-t-2 border-l-0 border-r-0 border-b-[#ffffff]   rounded-md " : "text-white"
        } to='/manageTask'>Manage Task</NavLink> : ''
      }
  <div className="mr-3 flex md:hidden cursor-pointer"> <DarkThemeToggle className="bg-white/90 cursor-pointer" /></div>
    </Navbar.Collapse>
  </Navbar>
   </div>

  );
};

export default AppNavbar;
