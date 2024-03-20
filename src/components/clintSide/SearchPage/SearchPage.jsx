import React, { useEffect, useState } from "react";
import Css from "./SearchPage.module.css";

import MainHeader from "../../common/Header/MainHeader/MainHeader";
import { useNavigate, useParams } from "react-router-dom";

import { getLocationHouse } from "../../../ReduxToolkit/Features/SuperAdmin/Location.slice.js";

// React Icon
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa6";
import { MdCurrencyRupee } from "react-icons/md";

// MUI meterial
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";

const SearchPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { house, loading, error } = useSelector((state) => state.location); // Destructure loading and error from state

  const [isActive, setIsActive] = useState(false);

  const id = useParams().id;
  console.log("searchiddddd", id);

  const userCheck = () => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      setIsActive(!isActive);
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    dispatch(getLocationHouse(id));
  }, [dispatch, id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  console.log("Data from Redux:", house);


  if (!Array.isArray(house)) {
    return <div>No data available</div>;
  }

  return (
    <>
      <div className={Css.headerBox}>
        <div className={Css.box}>
          <MainHeader />
          <div className={Css.searchPage}>
            <div className={Css.searchBox}>
              <h4>Showing 76 places</h4>
              <div className={Css.cards}>
                {house.map((house, index) => (
                  <div className={Css.card} key={index}>
                    <div className={Css.Imgcard}>
                      <img src={`http://localhost:8080/${house.image[0]}`} />
                      {isActive ? (
                        <FaHeart
                          onClick={() => {
                            userCheck();
                          }}
                          className={Css.ImgIcon}
                        />
                      ) : (
                        <FaRegHeart
                          onClick={() => {
                            userCheck();
                          }}
                          className={Css.ImgIcon}
                        />
                      )}
                    </div>
                    <div className={Css.cardDetails}>
                      <div className={Css.cardDetail}>
                        <h4>
                          <span>
                            <MdCurrencyRupee />
                          </span>
                          {house.rate}
                        </h4>
                        <h6>{house.description}</h6>
                        <h2>{house.houseName}</h2>
                        <p>{house.address}</p>
                      </div>
                      <div className={Css.btnHead}>
                        <Button className={Css.btn} variant="contained">
                          Enquire
                          <span className={Css.icon}>
                            <FaAngleRight />
                          </span>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchPage;
