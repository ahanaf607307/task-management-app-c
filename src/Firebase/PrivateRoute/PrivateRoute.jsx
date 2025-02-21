import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import Loading from "../../Components/Loading/Loading";
import useAuth from "../Authentication/useAuth";

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const { user, loading } = useAuth();
  if (loading) {
    return <Loading />;
  }
  if (user) {
    return children;
  }
  return <Navigate state={location.pathname} to="/" />;
};

export default PrivateRoute;
