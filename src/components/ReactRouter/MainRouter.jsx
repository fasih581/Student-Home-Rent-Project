import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../common/LoginAndSignup/Login";
import Signup from "../common/LoginAndSignup/Signup";
import Usermainlayouts from "../User/UserMainlayouts/Usermainlayouts";
// import MainCss from "../ReactRouter/MainRouter.module.css";

const MainRouter = () => {
  return (
    <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      <Route path="/" element={<Usermainlayouts />} />
    </Routes>
  );
};

export default MainRouter;
