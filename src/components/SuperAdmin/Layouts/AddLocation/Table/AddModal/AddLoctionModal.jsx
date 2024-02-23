import React, { useState } from "react";
import CssModal from "./AddLoctionModal.module.css";
// img
import Profile from "../../../../../../assets/img/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg";

// MUI
import Button from "@mui/material/Button";
import { IoCloseSharp } from "react-icons/io5";
import TextField from "@mui/material/TextField";

// Toastify
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useFormik } from "formik";
import { addLocation } from "../../../../../../ReduxToolkit/Features/SuperAdmin/Location.slice";
import { useDispatch } from "react-redux";

import { getData } from "../../../../../../ReduxToolkit/Features/SuperAdmin/Location.slice";

const AddLoctionModal = ({ addModalclose }) => {
  const [file, setFile] = useState();

  const dispatch = useDispatch();
  const Addlocation = useFormik({
    initialValues: {
      name: "",
      image: "",
      coordinates: [0, 0],
    },
    // validationSchema: AddContactschema,
    onSubmit: async (data, actions) => {
      formSumbitt(data, actions);
    },
  });

  const formSumbitt = async(data, actions) => {
    try {
      const formData =  new FormData();
      formData.append("name", data.name);
      formData.append("coordinates", data.coordinates);
      formData.append("image", data.image);

      await dispatch(addLocation(formData));
      addModalclose(); 
      dispatch(getData())
      toast.success("Location Added successfully!");
    } catch (error) {
      console.error("Error occurred while creating contact:", error);
      toast.error("Error Post contact. Please try again.");
    }
  };

  function handleImgChange(e) {
    const selectedFile = e.target.files[0];
    setFile(URL.createObjectURL(selectedFile));
    Addlocation.setFieldValue("image", selectedFile);
    // Addlocation.handleChange();
  }

  return (
    <>
      <div className={CssModal.overlay}></div>
      <div className={CssModal.contact_Box}>
        <div className={CssModal.BoxHead}>
          <h3>Add Location</h3>
          <Button variant="outlined" onClick={addModalclose}>
            <IoCloseSharp className={CssModal.icon} />
          </Button>
        </div>
        <hr className={CssModal.line} />
        <form onSubmit={Addlocation.handleSubmit}>
          <div className={CssModal.bodyInput}>
            <div className={CssModal.bodyInput}>
              <div className={CssModal.bodyimg}>
                <input
                  type="file"
                  name="image"
                  onBlur={Addlocation.handleBlur}
                  onChange={handleImgChange}
                  id="fileInput"
                  style={{ display: "none" }}
                />
                <label htmlFor="fileInput">
                  <img src={file || Profile} alt="Profile" />
                </label>
              </div>
            </div>
            <div className={CssModal.inputContainer}>
              <div className={CssModal.inputBox}>
                <TextField
                  name="name"
                  label="Enter the Place Name"
                  value={Addlocation.values.name}
                  onBlur={Addlocation.handleBlur}
                  onChange={Addlocation.handleChange}
                  className={CssModal.InputBox}
                />
              </div>
              <div className={CssModal.inputBox}>
                <TextField
                  name="coordinates"
                  label="Enter the coordinates"
                  value={Addlocation.values.coordinates}
                  onBlur={Addlocation.handleBlur}
                  onChange={Addlocation.handleChange}
                  className={CssModal.InputBox}
                />
              </div>
            </div>
          </div>
          <hr className={CssModal.line} />
          <div className={CssModal.Footer}>
            <Button variant="outlined" onClick={addModalclose}>
              Close
            </Button>
            <Button variant="contained" type="submit">
              Add Location
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddLoctionModal;
