import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { userDataContext } from "../../context/UserContext";

const UserProtectedRouter = () => {
  const { user } = useContext(userDataContext);
  const localUser = JSON.parse(localStorage.getItem("user"));

  // If user is not logged in, redirect to login
  if (!user && !localUser) {
    return <Navigate to="/user/login" replace />;
  }

  // If logged in, render child routes
  return <Outlet />;
};

export default UserProtectedRouter;