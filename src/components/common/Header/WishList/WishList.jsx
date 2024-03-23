import React, { useEffect } from "react";
import Css from "./WishList.module.css";

import Header from "../MainHeader/MainHeader";
import Card from "../../homeData/homeData";


import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserWishList } from "../../../../ReduxToolkit/Features/WishList.slice";

const WishList = () => {
  const dispatch = useDispatch();


  const  listItems  = useSelector((state) => state.wishList.listItems[0]?.homeDetails);
  console.log(listItems);

  const id = useParams().id;
  console.log("Wish List Id page", id);

  useEffect(() => {
    dispatch(getUserWishList({ userId: id }));
  }, [dispatch, id]);

  return (
    <div className={Css.headerBox}>
      <div className={Css.box}>
        <Header />
        <div className={Css.searchPage}>
          <div className={Css.searchBox}>
            <h4>Showing 76 places</h4>
            <div className={Css.cards}>
              {Array.isArray(listItems) &&
                listItems.map((listItem) => <Card homeData={listItem} />)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishList;
