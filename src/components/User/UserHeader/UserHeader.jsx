import React from "react";
import Css from "./UserHeader.module.css";

import MainHeader from "../../common/Header/MainHeader/MainHeader";

import Select from "react-select";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

const UserHeader = () => {
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
          <Select className={Css.search} options={options} isClearable={true} />
        </div>
      </div>
    </div>
  );
};

export default UserHeader;
