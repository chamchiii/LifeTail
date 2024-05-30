import { useState, useEffect, useContext } from "react";
import { PostDispatchContext, PostStateContext } from "../App";
import Modal from "react-modal";
import axios from "axios";
import CagtegoryList from "./CategoryList";
import { addToHeader } from "../util/AddHeader";
import { compareArray } from "../util/CompareObj";

const CategoryPlusModal = ({ categoryPlusModal, categoryList }) => {
  const { handleToggleCategoryPlusModal } = useContext(PostDispatchContext);
  const { accessToken } = useContext(PostStateContext);

  const [categories, setCategories] = useState([]);
  const [isModify, setIsModify] = useState(false);

  useEffect(() => {
    if (categoryList) {
      setCategories(categoryList);
    }
  }, [categoryList]);

  useEffect(() => {
    if (!categoryPlusModal) {
      setCategories(categoryList);
      setIsModify(false);
    }
  }, [categoryPlusModal]);

  useEffect(() => {
    if (categories) {
      console.log("모달 categories : ", categories);
    }
  }, [categories]);

  const modifyCategories = (categories) => {
    setIsModify(true);
    setCategories(categories);
  };

  const handleClickCancle = () => {
    handleToggleCategoryPlusModal();
  };

  const handleToggleIsModify = (bool) => {
    setIsModify(bool);
  };

  const handleClickSave = async () => {
    if (!isModify) {
      alert("변경된 점이 없습니다.");
      return;
    }
    const isEqualArray = compareArray(categoryList, categories);
    if (isEqualArray) {
      alert("변경된 점이 없습니다.");
      return;
    }
    const saveCategoyList = categories.map((it) =>
      it.isNew ? { ...it, id: "" } : it
    );
    let headers;
    if (accessToken) {
      headers = addToHeader(accessToken);
    }
    await axios
      .post("/api/category", saveCategoyList, { headers })
      .then((res) => handleToggleCategoryPlusModal())
      .catch((err) => console.log("handleClickSave() ERROR : "));
  };

  const customModalStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.4)",
      width: "100%",
      height: "100vh",
      zIndex: "100",
      position: "fixed",
      top: "0",
      left: "0",
    },
    content: {
      width: "400px",
      height: "520px",
      zIndex: "150",
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      borderRadius: "10px",
      boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.25)",
      backgroundColor: "var(--light-bg-100)",
      display: "flex",
      flexDirection: "column",
      // justifyContent: "center",
      alignItems: "center",
      fontFamily: "Noto Sans KR",
      animation: "modalAppear 0.1s ease-in-out",
      padding: "20px",
      gap: "3px",
    },
  };

  return (
    <div className="CategoryPlusModal">
      <Modal
        className="categoryPlusModal"
        isOpen={categoryPlusModal}
        onRequestClose={handleToggleCategoryPlusModal}
        style={customModalStyles}
      >
        <h2 className="categoryPlusModal_h2">카테고리 수정/추가</h2>
        <CagtegoryList
          categoryList={categories}
          modifyCategories={modifyCategories}
          handleToggleIsModify={handleToggleIsModify}
        />
        <div className="categoryPlusModal_button_area">
          <button
            className="categoryPlusModal_button_cancle"
            onClick={handleClickCancle}
          >
            취소
          </button>
          <button
            className="categoryPlusModal_button_save"
            onClick={handleClickSave}
          >
            저장
          </button>
        </div>
      </Modal>
    </div>
  );
};
export default CategoryPlusModal;
