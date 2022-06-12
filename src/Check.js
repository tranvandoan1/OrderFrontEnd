import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const Check = ({ children }) => {
  console.log(children)
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);
  return user ? children : <Navigate to="/signin" />;
};

export default Check;
