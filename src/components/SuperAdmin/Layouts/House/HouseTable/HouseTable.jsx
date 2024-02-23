import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import AddLoctionModal from "./AddModal/AddLoctionModal";
import EditModal from "./EditModal/EditLoctionModal";
import DeleteModal from "./DeletModal/DeletModal";

import { getData } from "../../../../../ReduxToolkit/Features/SuperAdmin/Location.slice";
import { MdDelete, MdModeEdit } from "react-icons/md";
import Button from "@mui/material/Button";

import Css from "./HouseTable.module.css";

const HouseTable = () => {
  const [AddModalOpen, satAddModalOpen] = useState(false);

  const [EditModalOpen, satEditModalOpen] = useState(false);
  const [DeleteModalOpen, satdeleteModalOpen] = useState(false);

  const dispatch = useDispatch();
  const { data, isLoading, error } = useSelector((state) => state.location);

  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <div className={Css.TableTittle}>
        <div>
          <h2 className={Css.heading}>House Table</h2>
        </div>
        <Button
          variant="contained"
          onClick={() => {
            satAddModalOpen(true);
          }}
        >
          Add House
        </Button>
        {AddModalOpen && (
          <AddLoctionModal addModalclose={() => satAddModalOpen(false)} />
        )}
      </div>
      <table className={Css.contentTable}>
        <thead>
          <tr>
            <th>Sl.No</th>
            <th>Image</th>
            <th>Name</th>
            <th>Location</th>
            <th>Category</th>
            <th>Rate</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(data) &&
            data.map((location, index) => (
              <tr className={Css.activeRow} key={index}>
                <td>{index + 1}</td>
                <td className={Css.tdImg}>
                  <img
                    src={`http://localhost:8080/${location.image}`}
                    className={Css.locationImage}
                  />
                </td>
                <td>{location.name}</td>
                <td>{location.coordinates}</td>
                <td className={Css.tdBtn}>
                  <Button
                    variant="contained"
                    onClick={() => {
                      satEditModalOpen(true);
                      satEditModalOpen(location._id);
                    }}
                  >
                    <MdModeEdit />
                  </Button>
                  {EditModalOpen && (
                    <EditModal
                      editModalClose={() => satEditModalOpen(false)}
                      contactId={EditModalOpen}
                    />
                  )}
                  <Button
                    variant="contained"
                    onClick={() => {
                      satdeleteModalOpen(true);
                      satdeleteModalOpen(location._id);
                    }}
                  >
                    <MdDelete />
                  </Button>
                  {DeleteModalOpen && (
                    <DeleteModal
                      deleteModalClose={() => satdeleteModalOpen(false)}
                      contactId={DeleteModalOpen}
                    />
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default HouseTable;
