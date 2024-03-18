import Css from "./PopularLocation.module.css";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { getData } from "../../../ReduxToolkit/Features/SuperAdmin/Location.slice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const PopularLocation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data } = useSelector((state) => state.location);

  useEffect(() => {
    dispatch(getData());
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
          <h2>Popular Cities Across In India</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor
          </p>
        </div>
        <div className={Css.cardBox}>
          <Slider className={Css.cardSlider} {...settings}>
            {data.map((location) => (
              <div className={Css.card} key={location.id}>
                <img
                  src={`http://localhost:8080/${location.image}`}
                />
                {/* <button onClick={() => navigate(`/location/${location.id}`)}>
                  {location.name}
                </button> */}
                <button>
                  {location.name}
                </button>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </>
  );
};

export default PopularLocation;

// import React, { useEffect } from "react";
// import Slider from "react-slick";
// // import "slick-carousel/slick/slick.css";
// // import "slick-carousel/slick/slick-theme.css";
// import Css from "./PopularLocation.module.css";

// const PopularLocation = () => {
//   useEffect(() => {
//     $(".center").slick({
//       centerMode: true,
//       centerPadding: "60px",
//       slidesToShow: 3,
//       responsive: [
//         {
//           breakpoint: 768,
//           settings: {
//             arrows: false,
//             centerMode: true,
//             centerPadding: "40px",
//             slidesToShow: 3,
//           },
//         },
//         {
//           breakpoint: 480,
//           settings: {
//             arrows: false,
//             centerMode: true,
//             centerPadding: "40px",
//             slidesToShow: 1,
//           },
//         },
//       ],
//     });
//   }, []);

//   return (
//     <div className="container">
//       <div className="header">
//         <h2>Popular Cities Across In India</h2>
//         <p>
//           Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
//           eiusmod tempor
//         </p>
//       </div>
//       <div className="cardBox">
//         <Slider className="center">
//           <div className={Css.card}>
//             <img
//               src="/src/assets/img/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg"
//               alt=""
//             />
//             <button>kochi</button>
//           </div>
//           <div className={Css.card}>
//             <img
//               src="/src/assets/img/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg"
//               alt=""
//             />
//             <button>kochi</button>
//           </div>
//           <div className={Css.card}>
//             <img
//               src="/src/assets/img/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg"
//               alt=""
//             />
//             <button>kochi</button>
//           </div>
//           <div className={Css.card}>
//             <img
//               src="/src/assets/img/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg"
//               alt=""
//             />
//             <button>kochi</button>
//           </div>
//           <div className={Css.card}>
//             <img
//               src="/src/assets/img/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg"
//               alt=""
//             />
//             <button>kochi</button>
//           </div>
//           <div className={Css.card}>
//             <img
//               src="/src/assets/img/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg"
//               alt=""
//             />
//             <button>kochi</button>
//           </div>
//         </Slider>
//       </div>
//     </div>
//   );
// };

// export default PopularLocation;
