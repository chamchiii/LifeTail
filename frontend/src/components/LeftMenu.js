import { PostStateContext, PostDispatchContext } from "../App";
import { useContext, useEffect, useState } from "react";

const LeftMenu = () => {
  const { category, postListLength } = useContext(PostStateContext);
  const { changeCategoryId } = useContext(PostDispatchContext);

  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(-1);
  const [viewAll, setViewAll] = useState(true);

  useEffect(() => {
    if (category) {
      setCategories(category);
    }
  }, [category]);

  useEffect(() => {
    if (!selectedCategoryId || parseInt(selectedCategoryId) === -1) {
      changeCategoryId(-1);
      setViewAll(true);
    } else {
      changeCategoryId(selectedCategoryId);
      setViewAll(false);
    }
  }, [selectedCategoryId]);

  const handleToggleSelected = (categoryId) => {
    setSelectedCategoryId(categoryId === selectedCategoryId ? -1 : categoryId);
  };

  return (
    <aside className="LeftMenu">
      <div className="leftmenu_category">
        <div className="category_main">
          <div>category</div>
          <div>
            <sapn className="category_add">+</sapn>
          </div>
        </div>
        <ul>
          <li
            className={`categories${
              selectedCategoryId === -1 && viewAll ? "_selected" : ""
            }`}
            onClick={() => handleToggleSelected(-1)}
          >
            전체 글 ({postListLength})
          </li>
          {categories.length > 0 ? (
            categories.map((it) => (
              <li
                className={`categories${
                  selectedCategoryId === it.id ? "_selected" : ""
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
