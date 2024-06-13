import { PostStateContext, PostDispatchContext } from "../App";
import { useContext, useEffect, useState } from "react";

import { ReactComponent as Plus } from "../assets/icons/add.svg";

const LeftMenu = () => {
  const { categoryList, postListLength, userRole, selectedCategoryId } =
    useContext(PostStateContext);
  const { changeCategoryId, handleToggleCategoryPlusModal } =
    useContext(PostDispatchContext);

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(-1);
  const [viewAll, setViewAll] = useState(true);

  useEffect(() => {
    if (categoryList) {
      setCategories(categoryList);
    }
  }, [categoryList]);

  useEffect(() => {
    if(selectedCategoryId){
      setSelectedCategory(selectedCategoryId);
    }
  }, [selectedCategoryId]);

  useEffect(() => {
    if (!selectedCategory || parseInt(selectedCategory) === -1) {
      changeCategoryId(-1);
      setViewAll(true);
    } else {
      changeCategoryId(selectedCategory);
      setViewAll(false);
    }
  }, [selectedCategory]);

  const handleToggleSelected = (categoryId) => {
    setSelectedCategory(categoryId === selectedCategory ? -1 : categoryId);
  };

  const handleClickPlus = () => {
    if (userRole !== "ADMIN") {
      alert(
        "현재 카테고리 추가/수정 기능은 관리자만 가능하도록 개발하였습니다."
      );
      return;
    }
    handleToggleCategoryPlusModal();
  };

  return (
    <aside className="LeftMenu">
      <div className="leftmenu_category">
        <div className="category_main">
          <div>category</div>
          <div className="category_plus_wrapper">
            <Plus onClick={handleClickPlus} />
          </div>
        </div>
        <ul>
          <li
            className={`categories${
              selectedCategory === -1 && viewAll ? "_selected" : ""
            }`}
            onClick={() => handleToggleSelected(-1)}
          >
            전체 글 ({postListLength})
          </li>
          {categories.length > 0 ? (
            categories.map((it) => (
              <li
                className={`categories${
                  selectedCategory === it.id ? "_selected" : ""
                }`}
                key={it.id}
                onClick={() => handleToggleSelected(it.id)}
              >
                {it.name} ({it.count})
              </li>
            ))
          ) : (
            <li className="categories">로딩중...</li>
          )}
        </ul>
      </div>
    </aside>
  );
};

export default LeftMenu;
