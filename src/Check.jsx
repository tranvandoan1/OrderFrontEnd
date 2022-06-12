import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const Check = ({ a }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    !user && (
      <>
        {alert("Bạn phải đăng nhập !")}
        <Navigate to="/signin" />
      </>
    )
  );
};

export default Check;
