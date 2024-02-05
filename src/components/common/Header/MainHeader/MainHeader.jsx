import React from "react";
import Css from "./Mainheader.module.css";

import { FaPhoneAlt, FaRegHeart, FaDownload } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";

// MUI meterial
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";

const MainHeader = () => {
  return (
    <div className={Css.header}>
      <h3>Home</h3>
      <div className={Css.navHeader}>
        <div className={Css.navbar}>
          <div className={Css.navPage}>
            <span>
              <FaDownload />
            </span>
            <p>Download</p>
          </div>
          <div className={Css.navPage}>
            <span>
              <FaPhoneAlt />
            </span>
            <p>Contact</p>
          </div>
          <div className={Css.navPage}>
            <span>
              <FaRegHeart />
            </span>
            <p>Wishlist</p>
          </div>
        </div>
        <div className={Css.navBtn}>
          <div className={Css.btn}></div>
          <PopupState variant="popover" popupId="demo-popup-menu">
            {(popupState) => (
              <div className={Css.btnHead}>
                <Button className={Css.btn} variant="contained" {...bindTrigger(popupState)}>
                  <span className={Css.icon}>
                    <CgProfile />
                  </span>
                  Profile
                </Button>
                <Menu className={Css.dropDown} {...bindMenu(popupState)}>
                  <MenuItem onClick={popupState.close}>Profile</MenuItem>
                  <MenuItem onClick={popupState.close}>My account</MenuItem>
                  <MenuItem onClick={popupState.close}>Logout</MenuItem>
                </Menu>
              </div>
            )}
          </PopupState>
        </div>
      </div>
    </div>
  );
};

export default MainHeader;
