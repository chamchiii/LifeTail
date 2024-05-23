import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "react-modal";

import { PostDispatchContext } from "../App";
import { PostStateContext } from "../App";
import { addToHeader } from "../util/AddHeader";

import { ReactComponent as Logo } from "../assets/logo/logo.svg";
import { ReactComponent as HomeIcon } from "../assets/icons/home.svg";
import { ReactComponent as SearchIcon } from "../assets/icons/search.svg";
import { ReactComponent as LoginIcon } from "../assets/icons/loginIcon.svg";
import { ReactComponent as LogoutIcon } from "../assets/icons/logoutIcon.svg";

import Button from "./Button";
import axios from "axios";

const Header = ({ search, isEdit, isNew, content }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    callPost,
    callCategories,
    handleToggleLoginModal,
    handleToggleLogin,
  } = useContext(PostDispatchContext);
  const { isLogin, accessToken, userRole } = useContext(PostStateContext);

  const [visible, setVisible] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");

  const [prevScrollPosition, setPrevScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setVisible(prevScrollPosition > scrollPosition);
      setPrevScrollPosition(scrollPosition);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPosition]);

  const handleLogoClick = () => {
    callPost();
    navigate("/");
  };

  const handleNewPost = () => {
    if (!isLogin || userRole.toUpperCase() !== "ADMIN") {
      alert("현재 글 작성 기능은 관리자만 가능하도록 개발하였습니다.");
      return;
    }
    navigate("/new");
  };

  const handleToggleModal = (modalOpen) => () => {
    setModalOpen(!modalOpen);
  };

  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleChangeSubtitle = (e) => {
    setSubtitle(e.target.value);
  };

  const handleClickBack = () => {
    callPost();
    navigate(-1, { replace: true });
  };

  const handleChangeSearchKeyword = (e) => {
    setSearchKeyword(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      navigate(`/post/search/${searchKeyword}`);
    }
  };

  const handleSavePost = async () => {
    let headers;
    if (accessToken) {
      headers = addToHeader(accessToken);
    }
    if (isNew) {
      await axios
        .post(
          "/api/post",
          {
            userId: 2,
            title: title,
            subtitle: subtitle,
            content: content,
            categoryId: 1,
          },
          { headers }
        )
        .then(() => {
          alert("저장완료");
          callPost();
          callCategories();
          navigate("/", { replace: true });
        })
        .catch((err) => {
          console.log("handleSavePost()_new ERROR : ");
        });
    } else {
      await axios
        .put(
          "/api/post",
          {
            userId: 2,
            id: id,
            title: title,
            subtitle: subtitle,
            content: content,
            categoryId: 1,
          },
          { headers }
        )
        .then(() => {
          alert("수정완료");
          callPost();
          callCategories();
          navigate("/", { replace: true });
        })
        .catch((err) => {
          alert("오류로 인하여 수정 실패하였습니다.");
          console.log("handleSavePost()_edit ERROR : ");
        });
    }
  };

  const handleClickLogout = () => {
    if (!window.confirm("로그아웃 하시겠습니까?")) {
      return;
    }
    handleToggleLogin(false);
    navigate("/", { replace: true });
  };

  return (
    <div>
      <header
        className={`Header${
          visible
            ? prevScrollPosition === 0
              ? " position_top"
              : ""
            : "_unvisible"
        }`}
      >
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
              <input
                type="text"
                placeholder="검색어를 입력해주세요..."
                onChange={handleChangeSearchKeyword}
                onKeyDown={handleKeyDown}
              />
            </div>
          )}
          {isEdit ? (
            <div className="header_buttons">
              <HomeIcon />
              <Button
                name={"back"}
                text={"뒤로가기"}
                type={"negative"}
                onClick={handleClickBack}
              />
              <Button
                name={"save"}
                text={"저장하기"}
                type={"positive"}
                onClick={handleToggleModal(modalOpen)}
              />
              <div className="login_and_out">
                {isLogin ? (
                  <LogoutIcon
                    width="27"
                    height="27"
                    onClick={handleClickLogout}
                  />
                ) : (
                  <LoginIcon
                    width="27"
                    height="27"
                    onClick={handleToggleLoginModal}
                  />
                )}
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
              <div className="login_and_out">
                {isLogin ? (
                  <LogoutIcon
                    width="27"
                    height="27"
                    onClick={handleClickLogout}
                  />
                ) : (
                  <LoginIcon
                    width="27"
                    height="27"
                    onClick={handleToggleLoginModal}
                  />
                )}
              </div>
            </div>
          )}
        </nav>
      </header>
      <Modal
        isOpen={modalOpen}
        onRequestClose={handleToggleModal(modalOpen)}
        style={{
          overlay: {
            backgroundColor: " rgba(0, 0, 0, 0.4)",
            width: "100%",
            height: "100vh",
            zIndex: "10",
            position: "fixed",
            top: "0",
            left: "0",
          },
          content: {
            width: "55%",
            height: "30%",
            zIndex: "150",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            borderRadius: "10px",
            boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.25)",
            backgroundColor: "white",
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            fontFamily: "Noto Sans KR",
          },
        }}
      >
        <div
          className="modal_info_area"
          style={{
            width: "100%",
            height: "75%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <input
            className="modal_title"
            type="text"
            placeholder="제목을 입력해 주세요."
            onChange={handleChangeTitle}
            style={{
              width: "101%",
              height: "50%",
              border: "none",
              fontSize: "48px",
              padding: "5px 30px 5px 30px ",
              marginBottom: "10px",
              backgroundColor: "var(--light-bg-200)",
              borderRadius: "10px",
            }}
          />
          <input
            className="modal_subtitle"
            type="text"
            placeholder="글을 설명할 부제목을 입력해 주세요."
            onChange={handleChangeSubtitle}
            style={{
              width: "101%",
              height: "25%",
              border: "none",
              fontSize: "36px",
              padding: "5px 30px 5px 30px ",
              marginBottom: "10px",
              backgroundColor: "var(--light-bg-200)",
              borderRadius: "10px",
            }}
          />
          <div className="modal_select_area">
            <label>분류 : </label>
            <select className="modal_select" style={{ border: "none" }}>
              <option>분류1</option>
              <option>분류2</option>
              <option>분류3</option>
              <option>분류4</option>
            </select>
          </div>
        </div>
        <div
          className="modal_button_area"
          style={{
            height: "25%",
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <button
            className="button button_negative button_modal_cancle"
            onClick={handleToggleModal(modalOpen)}
            style={{
              marginLeft: "20px",
              marginRight: "20px",
              width: "130px",
              height: "80%",
              fontSize: "20px",
            }}
          >
            뒤로가기
          </button>
          <button
            className="button button_positive button_modal_save"
            onClick={handleSavePost}
            style={{
              marginLeft: "20px",
              marginRight: "20px",
              width: "130px",
              height: "80%",
              fontSize: "20px",
            }}
          >
            저장하기
          </button>
          {/* <Button name={"modal_cancle"} text={"뒤로가기"} type={"negative"} />
          <Button name={"modal_save"} text={"저장버튼"} type={"positive"} /> */}
        </div>
      </Modal>
    </div>
  );
};
Header.defaultProps = {
  search: true,
  isEdit: false,
  isNew: true,
  editData: {},
};

export default React.memo(Header);
