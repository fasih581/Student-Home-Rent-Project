import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../common/LoginAndSignup/Login";
import Signup from "../common/LoginAndSignup/Signup";
import Usermainlayouts from "../User/UserMainlayouts/Usermainlayouts";
import SuperAdDashbord from "../SuperAdmin/DashBord/Dashbord";
import Location from "../SuperAdmin/Layouts/AddLocation/AddLocation";
import House from "../SuperAdmin/Layouts/House/House";

const MainRouter = () => {
  return (
    <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Usermainlayouts />} />

        <Route path="/" element={<SuperAdDashbord />} />
        <Route path="/location" element={<Location />} />
        <Route path="/house" element={<House />} />
    </Routes>
  );
};

export default MainRouter;
