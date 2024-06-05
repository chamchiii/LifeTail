import {useState, useEffect, useContext} from "react";
import {PostDispatchContext, PostStateContext} from "../App";
import Modal from "react-modal";
import axios from "axios";
import CagtegoryList from "./CategoryList";
import {addToHeader} from "../util/AddHeader";
import {compareArray} from "../util/CompareObj";

const CategoryPlusModal = ({categoryPlusModal, categoryList}) => {
  const {handleToggleCategoryPlusModal, callCategories} =
    useContext(PostDispatchContext);
  const {accessToken} = useContext(PostStateContext);

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

  const modifyCategories = (categories) => {
    handleToggleIsModify(true);
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
      it.isNew ? {...it, id: ""} : it
    );
    let headers;
    if (accessToken) {
      headers = addToHeader(accessToken);
    }
    await axios
      .post("/api/category", saveCategoyList, {headers})
      .then((res) => {
        handleToggleCategoryPlusModal();
        callCategories();
      })
      .catch((err) => {
        console.log("handleClickSave() ERROR : ");
        switch (parseInt(err.response.status)) {
          case 401:
            alert("인증되지 않은 사용자입니다. 회원가입 또는 로그인 후 재실행 부탁드립니다.");
            break;
          case 403:
            alert("관리자 권한이 부여되지 않은 사용자입니다.");
            break;
          default:
            alert("오류로 인하여 작업을 수행하지 못하였습니다.");
            break;
        }
      });
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
