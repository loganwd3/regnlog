import React from "react";
import { userContext } from "../App";
import { useContext } from "react";
import { Home } from "./Home";
import { Navigate } from "react-router-dom";

export const Private = () => {
  const user = useContext(userContext);
  return user.loggedUser !== null ? <Home /> : <Navigate to="/login" />;
};
