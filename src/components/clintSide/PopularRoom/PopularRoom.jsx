import Css from "./PopularRoom.module.css";
import HomeData from "../../common/homeData/homeData";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { getPopularRoom } from "../../../ReduxToolkit/Features/SuperAdmin/house.slice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "bootstrap";

const PopularRoom = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const RoomData  = useSelector((state) => state.house.popularRoomData);

  useEffect(() => {
    dispatch(getPopularRoom());
  }, [dispatch]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };

  return (
    <>
      <div className={Css.container}>
        <div className={Css.header}>
          <h2>Popular Room Across In India</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor
          </p>
        </div>
        <div className={Css.locations}>
          <button className={Css.location}>
            <p>kollam</p>
          </button>
          <button className={Css.location}>
            <p>Thiruvanadapuram</p>
          </button>
          <button className={Css.location}>
            <p>kozhikode</p>
          </button>
          <button className={Css.location}>
            <p>Kochi</p>
          </button>
        </div>
        <div className={Css.cardBox}>
          <Slider className={Css.cardSlider} {...settings}>
            {RoomData.map((RoomDatas) => (
              <HomeData RoomData={RoomDatas}/>
            ))}
          </Slider>
        </div>
      </div>
    </>
  );
};

export default PopularRoom;
