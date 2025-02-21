import React from "react";
import { Outlet } from "react-router-dom";
import AppNavbar from "../Pages/AppNavbar/AppNavbar";

const MainLayout = () => {
  return (
    <div>
      <AppNavbar />
    <div className="pt-14">
    <Outlet />
    </div>
    </div>
  );
};

export default MainLayout;
