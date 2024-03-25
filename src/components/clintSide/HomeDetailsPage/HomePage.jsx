// import React, { useEffect } from "react";
// import Css from "./HomePage.module.css";

// import Button from "@mui/material/Button";

// import Header from "../../common/Header/MainHeader/MainHeader";

// import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";

// import { FaChevronRight } from "react-icons/fa";
// import { MdCurrencyRupee } from "react-icons/md";

// import { createCheckoutSession, getHouseById } from "../../../ReduxToolkit/Features/SuperAdmin/house.slice";

// const HomePage = () => {
//   const dispatch = useDispatch();

//   const id = useParams().id;
//   console.log("home details id", id);

//   const userId = localStorage.getItem("userId");

//   const { dataById } = useSelector((state) => state.house);
//   console.log("data home details", dataById);

//   useEffect(() => {
//     dispatch(getHouseById({ id: id }));
//   }, [dispatch, id]);

//   if (!dataById) {
//     return <div>Loading...</div>;
//   }

//   const makePayment = async () => {
//     try {
//       await dispatch(createCheckoutSession({ userId, id }));
//     } catch (error) {
//       console.error("Error making payment:", error);
//     }
//   };

//   return (
//     <div className={Css.headerBox}>
//       <div className={Css.box}>
//         <Header />
//         <div className={Css.home_page}>
//           <div className={Css.home}>
//             <div className={Css.home_Box}>
//               <div className={Css.image_Box}>
//                 <div className={Css.image_Main}>
//                   <img
//                     src={`http://localhost:8080/${dataById?.image?.[0]}`}
//                     alt=""
//                   />
//                 </div>
//                 <div className={Css.images}>
//                   <img
//                     src={`http://localhost:8080/${dataById?.image?.[1]}`}
//                     alt=""
//                   />
//                   <img
//                     src={`http://localhost:8080/${dataById?.image?.[2]}`}
//                     alt=""
//                   />
//                   <img
//                     src={`http://localhost:8080/${dataById?.image?.[3]}`}
//                     alt=""
//                   />
//                 </div>
//               </div>
//               <div className={Css.homeDetails_Box}>
//                 <h4>
//                   <span>
//                     <MdCurrencyRupee />
//                   </span>
//                   {dataById?.rate}
//                 </h4>
//                 <h3>hellooo</h3>
//                 <h2>{dataById?.houseName}</h2>
//                 <p>hheeeeeeeeeeeeeee</p>
//               </div>
//             </div>
//             <div className={Css.booking_Box}>
//               <div className={Css.btnHead}>
//                 <Button
//                   className={Css.btn}
//                   variant="contained"
//                   onClick={() => makePayment()}
//                 >
//                   Booking
//                   <span className={Css.icon}>
//                     <FaChevronRight />
//                   </span>
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div></div>
//     </div>
//   );
// };

// export default HomePage;

import React, { useEffect } from "react";
import Css from "./HomePage.module.css";
import Button from "@mui/material/Button";
import Header from "../../common/Header/MainHeader/MainHeader";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";
import { MdCurrencyRupee } from "react-icons/md";
import { createCheckoutSession, getHouseById } from "../../../ReduxToolkit/Features/SuperAdmin/house.slice";

const HomePage = () => {
  const dispatch = useDispatch();
  const { id } = useParams(); // Destructuring id directly from useParams
  const userId = localStorage.getItem("userId");
  const { dataById, isLoading, error } = useSelector((state) => state.house);

  useEffect(() => {
    dispatch(getHouseById({ id: id }));
  }, [dispatch, id]);

  const makePayment = async () => {
    try {
      await dispatch(createCheckoutSession({ homeId: id, userId }));
    } catch (error) {
      console.error("Error making payment:", error);
      // You can dispatch an action to update state indicating payment failure
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!dataById) {
    return <div>No data found</div>;
  }

  return (
    <div className={Css.headerBox}>
      <div className={Css.box}>
        <Header />
        <div className={Css.home_page}>
          <div className={Css.home}>
            <div className={Css.home_Box}>
              <div className={Css.image_Box}>
                <div className={Css.image_Main}>
                  <img src={`http://localhost:8080/${dataById?.image?.[0]}`} alt="" />
                </div>
                <div className={Css.images}>
                  {dataById?.image?.slice(1).map((image, index) => (
                    <img key={index} src={`http://localhost:8080/${image}`} alt="" />
                  ))}
                </div>
              </div>
              <div className={Css.homeDetails_Box}>
                <h4>
                  <span>
                    <MdCurrencyRupee />
                  </span>
                  {dataById?.rate}
                </h4>
                <h3>{dataById?.title}</h3>
                <h2>{dataById?.houseName}</h2>
                <p>{dataById?.description}</p>
              </div>
            </div>
            <div className={Css.booking_Box}>
              <div className={Css.btnHead}>
                <Button className={Css.btn} variant="contained" onClick={() => makePayment()}>
                  Booking <span className={Css.icon}><FaChevronRight /></span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default HomePage;
