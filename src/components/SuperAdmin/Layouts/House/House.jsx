import React, { useState } from "react";
import SideBar from "../../common/SideBar/Sidebar";
import Table from "./HouseTable/HouseTable";
import Css from "./House.module.css";

// import AddLoctionModal from "./Table/AddModal/AddLoctionModal";
import Button from "@mui/material/Button";

// toastifyrs
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const House = () => {
  // const [AddModalOpen, satAddModalOpen] = useState(false);

  return (
    <>
      <div className={Css.page}>
        <SideBar />
        <div className={Css.pageTable}>
          <Table />
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default House;
