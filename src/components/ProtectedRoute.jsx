import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie"; // Import js-cookie

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const token = Cookies.get('token'); // Retrieve the token from cookies

  return token ? <Component {...rest} /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
