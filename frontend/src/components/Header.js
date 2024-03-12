import { ReactComponent as Logo } from "../assets/logo/logo.svg";
import { ReactComponent as HomeIcon } from "../assets/icons/home.svg";
import { ReactComponent as SearchIcon } from "../assets/icons/search.svg";
import profile from "../assets/images/avatar.png";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

const Header = ({ search, isEdit }) => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleNewPost = () => {
    navigate("/new");
  };

  const handleSave = () => {
    alert("저장버튼 누름");
    navigate("/", { replace: true });
  };

  return (
    <header className="Header">
      <nav className="header_content">
        <div className="header_logo">
          <Logo
            className="logo_svg"
            onClick={handleLogoClick}
            preserveAspectRatio="xMidYMid meet"
            height="48"
            width="120"
            viewBox="0 0 220 90"
          />
        </div>
        {search && (
          <div className="header_search">
            <SearchIcon className="search_icon" />
            <input type="text" placeholder="검색어를 입력해주세요..." />
          </div>
        )}
        {isEdit ? (
          <div className="header_buttons">
            <HomeIcon />
            <Button
              name={"back"}
              text={"뒤로가기"}
              type={"negative"}
              onClick={() => navigate(-1, { replace: true })}
            />
            <Button
              name={"save"}
              text={"저장하기"}
              type={"positive"}
              onClick={handleSave}
            />
            <div className="profile_image">
              <img src={profile} alt="프로필 사진" />
            </div>
          </div>
        ) : (
          <div className="header_buttons">
            <HomeIcon />
            <Button
              name={"new_post"}
              text={"새 글 작성"}
              onClick={handleNewPost}
            />
            <div className="profile_image">
              <img src={profile} alt="프로필 사진" />
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
Header.defaultProps = {
  search: true,
  isEdit: false,
};

export default Header;
