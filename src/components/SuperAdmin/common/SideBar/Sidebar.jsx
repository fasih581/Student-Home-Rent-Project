import React from "react";
import Css from "./Sidebar.module.css";
import { RxDashboard } from "react-icons/rx";
import { CiLocationOn } from "react-icons/ci";
import { BsHouseAdd } from "react-icons/bs";

import Button from "@mui/material/Button";

const Sidebar = () => {
  return (
    <div className={Css.sideBar}>
      <div className={Css.head}>
        <h3>Header</h3>
      </div>
      <div className={Css.navBar}>
        <div className={Css.btnInput}>
          <Button className={Css.btn} variant="contained">
            <RxDashboard />
            Dashboard
          </Button>
        </div>
        <div className={Css.btnInput}>
          <Button className={Css.btn} variant="contained" href="/location">
            <CiLocationOn />
            Location
          </Button>
        </div>
        <div className={Css.btnInput}>
          <Button className={Css.btn} variant="contained" href="/house">
          <BsHouseAdd />
            House
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
