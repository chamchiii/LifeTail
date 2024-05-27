import Modal from "react-modal";
import { PostDispatchContext } from "../App";
import { useContext } from "react";

const CategoryPlusModal = ({ categoryPlusModal }) => {
  const { handleToggleCategoryPlusModal } = useContext(PostDispatchContext);

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
      overflow: "hidden",
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
    <div className="CategoryPlus">
      <Modal
        isOpen={categoryPlusModal}
        onRequestClose={handleToggleCategoryPlusModal}
        style={customModalStyles}
      ></Modal>
    </div>
  );
};
export default CategoryPlusModal;
