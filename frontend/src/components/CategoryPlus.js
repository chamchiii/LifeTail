import Modal from "react-modal";
import { PostDispatchContext } from "../App";
import { useContext } from "react";

const CategoryPlus = ({ categoryPlusModal }) => {
  const { handleToggleCategoryPlusModal } = useContext(PostDispatchContext);

  return <div className="CategoryPlus"></div>;
};
export default CategoryPlus;
