import React, { useEffect, useState } from "react";
import EditModal from "./EditLoctionModal.module.css";
import Button from "@mui/material/Button";
import { IoCloseSharp } from "react-icons/io5";
import TextField from "@mui/material/TextField";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import {
  getData,
  getDataById,
  updateLocation,
} from "../../../../../../ReduxToolkit/Features/SuperAdmin/Location.slice";

const EditLoctionModal = ({ contactId, editModalClose }) => {
  const dispatch = useDispatch();

  const [file, setFile] = useState(null);
  const [Data, setData] = useState(null);
  const [imgPreview, setImgPreview] = useState(null);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await dispatch(getDataById({ id: contactId }));
        const responseData = response.payload;
        setData(responseData);
        if (responseData.image) {
          setImgPreview(`http://localhost:8080/${responseData.image}`);
        }
      } catch (error) {
        console.error("Error fetching Location data:", error);
      }
    };
    fetchdata();
  }, [contactId, dispatch]);

  const Editlocation = useFormik({
    initialValues: {
      name: Data?.name || "",
      image: "",
      coordinates: Data?.coordinates || [0, 0],
    },
    onSubmit: async (data, actions) => {
      formSubmit(data, actions);
    },
    enableReinitialize: true,
  });

  const formSubmit = async (data, actions) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("coordinates", data.coordinates);
      formData.append("image", file);
      
      // Make sure to pass the correct ID
      await dispatch(updateLocation({ id: contactId, data: formData }));
      
      editModalClose();
      dispatch(getData());
      toast.success("Location Updated successfully!");
    } catch (error) {
      console.error("Error occurred while updating location:", error);
      toast.error("Error updating location. Please try again.");
    }
  };
  

  function handleImgChange(e) {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    Editlocation.setFieldValue("image", selectedFile);
  
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImgPreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setImgPreview(null);
    }
  }
  

  return (
    <>
      <div className={EditModal.overlay}></div>
      <div className={EditModal.contact_Box}>
        <div className={EditModal.BoxHead}>
          <h3>Edit Location</h3>
          <Button variant="outlined" onClick={editModalClose}>
            <IoCloseSharp className={EditModal.icon} />
          </Button>
        </div>
        <hr className={EditModal.line} />
        <form onSubmit={Editlocation.handleSubmit}>
          <div className={EditModal.bodyInput}>
            <div className={EditModal.bodyInput}>
              <div className={EditModal.bodyimg}>
                <input
                  type="file"
                  name="image"
                  onBlur={Editlocation.handleBlur}
                  onChange={handleImgChange}
                  id="imgeInput"
                  // style={{ display: "none" }}
                />
                <label htmlFor="imgeInput">
                  <img src={imgPreview} />
                </label>
                {/* {imgPreview && (
                  <label htmlFor="imgeInput" >
                     <img src={imgPreview} />
                  </label>
                )} */}
              </div>
            </div>
            <div className={EditModal.inputContainer}>
              <div className={EditModal.inputBox}>
                <TextField
                  name="name"
                  label="Enter the Place Name"
                  value={Editlocation.values.name}
                  onBlur={Editlocation.handleBlur}
                  onChange={Editlocation.handleChange}
                  className={EditModal.InputBox}
                />
              </div>
              <div className={EditModal.inputBox}>
                <TextField
                  name="coordinates"
                  label="Enter the coordinates"
                  value={Editlocation.values.coordinates}
                  onBlur={Editlocation.handleBlur}
                  onChange={Editlocation.handleChange}
                  className={EditModal.InputBox}
                />
              </div>
            </div>
          </div>
          <hr className={EditModal.line} />
          <div className={EditModal.Footer}>
            <Button variant="outlined" onClick={editModalClose}>
              Close
            </Button>
            <Button variant="contained" type="submit">
              Save Location
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditLoctionModal;
