import React, { useEffect } from "react";
import Css from "./UserHeader.module.css";

import MainHeader from "../../common/Header/MainHeader/MainHeader";
import Select from "react-select";

import { getData } from "../../../ReduxToolkit/Features/SuperAdmin/Location.slice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const UserHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data } = useSelector((state) => state.location);

  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);

  const options = data.map((location) => ({
    value: location._id,
    label: location.name,
  }));

  return (
    <div className={Css.userhead}>
      <div className={Css.box}>
        <MainHeader />
        <div className={Css.userBody}>
          <h1>HOME AWAY FROM HOME</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim
          </p>
          <Select
            className={Css.search}
            options={options}
            onChange={(selectedOption) => {
              if (selectedOption) {
                const id = selectedOption.value;
                navigate(`/search/${id}`);
              }
            }}
            isClearable={true}
          />
        </div>
      </div>
    </div>
  );
};

export default UserHeader;
