import React, { useState } from "react";
import SideBar from "../../common/SideBar/Sidebar";
import Table from "./Table/AddLocationTable";
import Css from "./AddLocation.module.css";

// import AddLoctionModal from "./Table/AddModal/AddLoctionModal";
import Button from "@mui/material/Button";

// toastifyrs
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddLocation = () => {
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

export default AddLocation;
