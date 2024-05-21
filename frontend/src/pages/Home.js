import { useContext, useEffect, useState } from "react";
import { PostStateContext } from "../App";
import Modal from "react-modal";

import Header from "../components/Header";
import LeftMenu from "../components/LeftMenu";
import Profile from "../components/Profile";
import PostsList from "../components/PostsList";
import RightMenu from "../components/RightMenu";

const Home = () => {
  const { post, category, selectedCategoryId } = useContext(PostStateContext);

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (category) {
      setCategories(category);
    }
  }, [category]);

  useEffect(() => {
    getTargetPost();
  }, [selectedCategoryId, categories]);

  const getTargetPost = () => {
    const targetPost = categories.find(
      (it) => parseInt(it.id) === parseInt(selectedCategoryId)
    );
    setSelectedCategory(targetPost);
  };

  const handleToggleModal = (modalOpen) => () => {
    setModalOpen(!modalOpen);
  };

  return (
    <div className="Home">
      <Header />
      <div className="profile_area">
        <Profile />
      </div>
      <div className="selected_category_area">
        <div className="selected_category_selected">
          {parseInt(selectedCategoryId) === -1
            ? "전체 글"
            : selectedCategory
            ? selectedCategory.name
            : "로딩중..."}
        </div>
      </div>
      <div className="content_area">
        <div className="left_menu_wrapper">
          <LeftMenu />
        </div>
        <div className="post_list_wrapper">
          <PostsList post={post} isSearch={false} />
        </div>
        <div className="right_menu_wrapper">
          <RightMenu />
        </div>
      </div>
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
      ></Modal>
    </div>
  );
};

export default Home;
