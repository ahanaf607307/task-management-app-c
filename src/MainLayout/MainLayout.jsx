import React from "react";
import { Outlet } from "react-router-dom";
import AppNavbar from "../Pages/AppNavbar/AppNavbar";

const MainLayout = () => {
  return (
    <div className="">
      <AppNavbar />
    <div className="pt-12 md:pt-20 ">
    <Outlet />
    </div>
    </div>
  );
};

export default MainLayout;
