import Header from "../ClintHeader/UserHeader";
import PopularLocation from "../LocationSection/PopularLocation"
import PopularRoom from "../PopularRoom/PopularRoom"

const MainPage = () => {
  return (
    <div>
      <Header />
      <PopularLocation />
      <PopularRoom />
    </div>
  );
};

export default MainPage;
