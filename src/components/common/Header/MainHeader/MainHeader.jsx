import React, { useEffect, useState } from "react";
import Css from "./Mainheader.module.css";
import Search from "../../../clintSide/SearchPage/SearchPage.jsx";

import { FaHome, FaPhoneAlt, FaRegHeart, FaDownload, FaHeart } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { IoMdLogIn } from "react-icons/io";

// MUI meterial
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";

import { getData } from "../../../../ReduxToolkit/Features/SuperAdmin/Location.slice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

const MainHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const [searchId, setSearchId] = useState(null);
  // console.log("header searchIDDD", searchId);

  const { data } = useSelector((state) => state.location);

  const userId = localStorage.getItem("userId");

  const loginPath = () => {
    navigate("/login");
  };

  const wishList = () => {
    navigate(`/wish-list/${userId}`);
  };

  const homePage = () => {
    navigate("/");
  };

  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);

  const options = data.map((location) => ({
    value: location._id,
    label: location.name,
  }));

  return (
    <div className={Css.header}>
      {window.location.pathname === "/" ? (
        <h3 className={Css.homeHeading}>Home</h3>
      ) : (
        <h3 className={Css.heading}>Home</h3>
      )}
      <div>
        {window.location.pathname === "/" ? null : (
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
        )}
      </div>
      {userId ? (
        <div className={Css.navHeader}>
          <div className={Css.navbar}>
            {window.location.pathname === "/" ? (
              <>
                <div className={Css.homeNavPage}>
                  <span>
                    <FaPhoneAlt />
                  </span>
                  <p>Contact</p>
                </div>
                <div className={Css.homeNavPage} onClick={wishList}>
                  <span>
                    <FaRegHeart />
                  </span>
                  <p>Wishlist</p>
                </div>
              </>
            ) : (
              <>
                <div className={Css.navPage} onClick={homePage}>
                  <span>
                    <FaHome />
                  </span>
                  <p>Home</p>
                </div>
                <div className={Css.navPage}>
                  <span>
                    <FaPhoneAlt />
                  </span>
                  <p>Contact</p>
                </div>
                {window.location.pathname === `/wish-list/${userId}` ? (
                  <div className={Css.navWishList} onClick={wishList}>
                    <span>
                      <FaHeart />
                    </span>
                    <p>Wishlist</p>
                  </div>
                ) : (
                  <div className={Css.navPage} onClick={wishList}>
                    <span>
                      <FaRegHeart />
                    </span>
                    <p>Wishlist</p>
                  </div>
                )}
              </>
            )}
          </div>
          <div className={Css.navBtn}>
            <div className={Css.btn}></div>
            <PopupState variant="popover" popupId="demo-popup-menu">
              {(popupState) => (
                <div className={Css.btnHead}>
                  <Button
                    className={Css.btn}
                    variant="contained"
                    {...bindTrigger(popupState)}
                  >
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
      ) : (
        <div className={Css.navHeader}>
          <div className={Css.navBtn}>
            <div className={Css.btnHead}>
              <Button
                className={Css.btn}
                variant="contained"
                onClick={loginPath}
              >
                <span className={Css.icon}>
                  <IoMdLogIn />
                </span>
                Login
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainHeader;
