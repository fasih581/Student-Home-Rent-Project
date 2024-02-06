import Css from "./Dashbord.module.css";
import Siderbar from "../Layouts/SideBar/Sidebar";
import AddLocation from "../Layouts/AddLocation/AddLocation";

const Dashbord = () => {
  return (
    <div className={Css.boxall}>
      <div className={Css.box}>
        <div className={Css.sideNav}>
          <Siderbar />
        </div>
        <div className={Css.Mainpage}>
          <AddLocation />
        </div>
      </div>
    </div>
  );
};

export default Dashbord;
