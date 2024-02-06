import React from 'react'
import Css from "./Sidebar.module.css"
import { RxDashboard } from "react-icons/rx";
import { CiLocationOn } from "react-icons/ci";

import Button from '@mui/material/Button';

const Sidebar = () => {
  return (
    <div className={Css.sideBar}>
    <div className={Css.head}>
        <h3>Header</h3>
    </div>
    <div className={Css.navBar}>
      <div className={Css.btnInput}>
      <Button className={Css.btn} variant="contained"><RxDashboard />Dashboard</Button>
      </div>
      <div className={Css.btnInput}>
      <Button className={Css.btn} variant="contained"><CiLocationOn />Add Location</Button>
      </div>
    </div>
    </div>
  )
}

export default Sidebar