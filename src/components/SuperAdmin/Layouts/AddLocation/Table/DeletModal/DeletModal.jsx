import React from "react";
import DeletCss from "./DeletModal.module.css";
import { IoCloseSharp } from "react-icons/io5";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteContact,
  getData,
} from "../../../../../../ReduxToolkit/Features/SuperAdmin/Location.slice";

// Toastify
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DeletModal = ({ deleteModalClose, contactId }) => {
  const dispatch = useDispatch();

  const deleteBtn = async () => {
    try {
      await dispatch(deleteContact(contactId));
      deleteModalClose();
      dispatch(getData());
      toast.success("Contact delet successfully!");
    } catch (error) {
      console.error("Error deleting contact:", error);
      toast.error("Error delet contact. Please try again.");
    }
  };

  return (
    <>
      <div className={DeletCss.overlay}></div>
      <div className={DeletCss.contact_Box}>
        <div className={DeletCss.BoxHead}>
          <h3>Delete Contact</h3>
          <button className={DeletCss.HeadCl} onClick={deleteModalClose}>
            <IoCloseSharp className={DeletCss.icon} />
          </button>
        </div>
        <hr className={DeletCss.line} />
        <h4 className={DeletCss.bodyTitle}>
          Are you sure you want to delete this Contact
        </h4>
        <hr className={DeletCss.line} />
        <div className={DeletCss.Footer}>
          <Button
            className={`${DeletCss.btn} ${DeletCss.cls}`}
            onClick={deleteModalClose}
          >
            Close
          </Button>
          <Button
            type="submit"
            className={`${DeletCss.btn} ${DeletCss.sve}`}
            onClick={deleteBtn}
          >
            Delete
          </Button>
        </div>
      </div>
    </>
  );
};

export default DeletModal;
