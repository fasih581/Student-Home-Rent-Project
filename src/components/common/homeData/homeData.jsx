import React, { useEffect, useState } from "react";
import Css from "./homeData.module.css";
import { useNavigate } from "react-router-dom";
import {
  addWishList,
  deleteHomeWishList,
  getUserWishList,
} from "../../../ReduxToolkit/Features/WishList.slice";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa6";
import { MdCurrencyRupee } from "react-icons/md";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";

const HomeData = ({ homeData }) => {
  console.log("wish List", homeData);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { listItems } = useSelector((state) => state.wishList);
  const [isActive, setIsActive] = useState(false);

  const userId = localStorage.getItem("userId");
  console.log("wish List userId", userId);

  useEffect(() => {
    if (userId) {
      dispatch(getUserWishList({ userId }));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    if (listItems && homeData) {
      const favorite = listItems[0]?.favHome?.find(
        (item) => item._id === homeData._id
      );
      if (favorite) {
        setIsActive(true);
      } else {
        setIsActive(false);
      }
    }
  }, [listItems, homeData]);

  const userCheck = async (id) => {
    if (!userId) {
      navigate("/login");
      return;
    }

    if (!isActive) {
      await dispatch(addWishList({ userId, homeId: id }));
      dispatch(getUserWishList({ userId }));
    } else {
      await dispatch(deleteHomeWishList({ userId, homeId: id }));
      dispatch(getUserWishList({ userId }));
    }
  };

  return (
    <div className={Css.card} key={homeData._id}>
      <div className={Css.Imgcard}>
        <img
          src={`http://localhost:8080/${homeData.image && homeData.image[0]}`}
          alt="home"
        />
        {isActive ? (
          <FaHeart
            onClick={() => userCheck(homeData._id)}
            className={Css.ImgIcon}
          />
        ) : (
          <FaRegHeart
            onClick={() => userCheck(homeData._id)}
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
            {homeData.rate}
          </h4>
          <h6>{homeData.description}</h6>
          <h2>{homeData.houseName}</h2>
          <p>{homeData.address}</p>
        </div>
        <div className={Css.btnHead}>
          <Button
            className={Css.btn}
            variant="contained"
            onClick={() => navigate(`/home-Detail/${homeData._id}`)}
          >
            Enquire
            <span className={Css.icon}>
              <FaAngleRight />
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HomeData;
