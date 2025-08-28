import React, { useContext } from "react";
import { CartContext } from "../Store/CartContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { token } = useContext(CartContext);

  if (token !== null) {
    if (children.type.name === "Login" || children.type.name === "Register") {
      return <Navigate to="../"/>;
    }
  }else return children

};

export default ProtectedRoute;
