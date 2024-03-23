import React, { useEffect } from "react";
import Css from "./HomePage.module.css";

import Header from "../../common/Header/MainHeader/MainHeader";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { MdCurrencyRupee } from "react-icons/md";
import { getHouseById } from "../../../ReduxToolkit/Features/SuperAdmin/house.slice";

const HomePage = () => {
  const dispatch = useDispatch();

  const id = useParams().id;
  console.log("home details id", id);

  const data  = useSelector((state) => state.house.data);
  console.log("data", data);

  useEffect(() => {
    dispatch(getHouseById({ id: id }));
  }, [dispatch, id]);

  return (
    <div className={Css.headerBox}>
      <div className={Css.box}>
        <Header />
        <div className={Css.home_page}>
          <div className={Css.home}>
            <div className={Css.home_Box}>
              <div className={Css.image_Box}>
                <div className={Css.image_Main}>
                  <img
                    src={`http://localhost:8080/${data?.image?.[0]}`}
                    alt=""
                  />
                </div>
                <div className={Css.images}>
                  <img
                    src={`http://localhost:8080/${data?.image?.[1]}`}
                    alt=""
                  />
                  <img
                    src={`http://localhost:8080/${data?.image?.[2]}`}
                    alt=""
                  />
                  <img
                    src={`http://localhost:8080/${data?.image?.[3]}`}
                    alt=""
                  />
                </div>
              </div>
              <div className={Css.homeDetails_Box}>
                <h4>
                  <span>
                    <MdCurrencyRupee />
                  </span>
                  {data?.rate}
                </h4>
                <h6>{data?.houseName}</h6>
                <h2>hellooo</h2>
                <p>hheeeeeeeeeeeeeee</p>
              </div>
            </div>
            <div className={Css.booking_Box}>
              <h1>heeloooo</h1>
            </div>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default HomePage;
