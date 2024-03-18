import React, { useEffect } from "react";
import Css from "./SearchPage.module.css";

import MainHeader from "../../common/Header/MainHeader/MainHeader";
import { useLocation, useParams } from "react-router-dom";

import { FaHeart, FaRegHeart } from "react-icons/fa";

const SearchPage = () => {
  const id = useParams().id;
  console.log("searchiddddd", id);

  useEffect(() => {
    //  console.log("Location ID:", location.state.id);
  }, []);

  return (
    <>
      <div className={Css.headerBox}>
        <div className={Css.box}>
          <MainHeader />
          <div className={Css.searchPage}>
            <div className={Css.searchBox}>
              <h4>Showing 76 places</h4>
              <div className={Css.cards}>
                <div className={Css.card}>
                  <div className={Css.Imgcard}>
                    <img src="/src/assets/img/room-.jpeg" />
                    <FaHeart className={Css.ImgIcon}/>
                  </div>
                  <div className={Css.CardDetails}></div>
                </div>
                <div className={Css.card}>
                  <div className={Css.Imgcard}>
                    <img src="/src/assets/img/room-.jpeg" />
                    <FaRegHeart className={Css.ImgIcon}/>
                  </div>
                  <div className={Css.CardDetails}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchPage;
