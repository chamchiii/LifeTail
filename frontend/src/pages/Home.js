import Header from "../components/Header";
import LeftMenu from "../components/LeftMenu";
import Profile from "../components/Profile";
import PostsList from "../components/PostsList";
import RightMenu from "../components/RightMenu";

const Home = () => {
  return (
    <div className="Home">
      <Header />
      <div className="profile_area">
        <Profile />
      </div>
      <div className="content_area">
        <LeftMenu />
        <PostsList />
        <RightMenu />
      </div>
    </div>
  );
};

export default Home;
