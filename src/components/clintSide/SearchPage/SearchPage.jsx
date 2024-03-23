import React, { useEffect, useState } from "react";
import Css from "./SearchPage.module.css";

import MainHeader from "../../common/Header/MainHeader/MainHeader";
import Card from "../../common/homeData/homeData.jsx";

import { useParams } from "react-router-dom";

import { getLocationHouse } from "../../../ReduxToolkit/Features/SuperAdmin/Location.slice.js";

import { useDispatch, useSelector } from "react-redux";

const SearchPage = () => {
  const dispatch = useDispatch();

  const { house, loading, error } = useSelector((state) => state.location);

  const id = useParams().id;
  // console.log("searchiddddd", id);

  useEffect(() => {
    dispatch(getLocationHouse(id));
  }, [dispatch, id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

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
                {Array.isArray(house) &&
                  house.map((house) => (
                    <Card homeData={house} />
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
