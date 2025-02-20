import React from "react";
import { Outlet } from "react-router-dom";
import AppNavbar from "../Pages/AppNavbar/AppNavbar";

const MainLayout = () => {
  return (
    <div>
      <AppNavbar />
      <Outlet />
    </div>
  );
};

export default MainLayout;
