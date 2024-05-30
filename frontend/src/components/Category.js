import { useEffect, useState } from "react";

const Category = ({ category, modifyCategory }) => {
  const [categoryData, setCategoryData] = useState({});
  const [name, setName] = useState("");
  // const [turn, setTurn] = useState(0);

  useEffect(() => {
    if (category) {
      setCategoryData(category);
      setName(category.name);
    }
  }, [category]);

  const handleChangeCategoryName = (e) => {
    setName(e.target.value);
    modifyCategory(categoryData.id, e.target.value);
  };

  return (
    <div className="Category">
      <div className="category_info_area">
        {categoryData.name === "미지정" ? (
          <input value={name} onChange={handleChangeCategoryName} disabled />
        ) : (
          <input value={name} onChange={handleChangeCategoryName} />
        )}
      </div>
    </div>
  );
};

export default Category;
