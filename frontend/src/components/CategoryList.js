import React, { useEffect, useState } from "react";
import Category from "./Category";
import { ReactComponent as Arrow } from "../assets/icons/leftIcon.svg";
import { ReactComponent as Trash } from "../assets/icons/trash.svg";
import { ReactComponent as TrashX } from "../assets/icons/trashX.svg";
import { ReactComponent as PlusIcon } from "../assets/icons/plusIcon.svg";

const CagtegoryList = ({ categoryList, modifyCategories }) => {
  const [categories, setCategories] = useState([]);
  const [deletedCategories, setDeletedCategories] = useState([]);
  const [minTurn, setMinTurn] = useState(0);
  const [maxTurn, setMaxTurn] = useState(0);

  useEffect(() => {
    if (categoryList) {
      const filteredCategoryList = categoryList.filter(
        (it) => it.isDeleted === "N"
      );
      setCategories(filteredCategoryList);
      const deletedCategoryList = categoryList
        .filter((it) => it.isDeleted === "Y")
        .map((it) => {
          return { ...it, turn: 999999 };
        });
      setDeletedCategories(deletedCategoryList);
    }
  }, [categoryList]);

  useEffect(() => {
    if (categories.length > 0) {
      setMaxTurn(
        categories.reduce((max, it) => {
          return it.turn > max.turn ? it : max;
        }, categories[0]).turn
      );
      setMinTurn(
        categories.reduce((min, it) => {
          return it.turn < min.turn ? it : min;
        }, categories[0]).turn
      );
    }
  }, [categories]);

  const handleClickPlus = () => {
    const categoryData = {
      id: Math.max(
        ...categories.map((it) => (it.id || it.id === 0 ? it.id + 1 : 0))
      ),
      name: "",
      turn: Math.max(
        ...categories.map((it) => (it.turn || it.turn === 0 ? it.turn + 1 : 0))
      ),
      isDeleted: "N",
      count: 0,
      isNew: true,
    };

    let changedCategories = [...categories, categoryData];

    if (deletedCategories.length > 0) {
      changedCategories = changedCategories.concat(deletedCategories);
    }
    changedCategories.sort((a, b) => a.turn - b.turn);

    modifyCategories(changedCategories);
  };

  const modifyCategory = (id, title) => {
    let changedCategories = categories.map((category) =>
      category.id === id ? { ...category, name: title } : category
    );
    if (deletedCategories.length > 0) {
      changedCategories = changedCategories.concat(deletedCategories);
    }
    changedCategories.sort((a, b) => a.turn - b.turn);
    modifyCategories(changedCategories);
  };

  const handleClickDelete = (id) => {
    let changedCategories = categories.map((it) =>
      parseInt(it.id) === parseInt(id) ? { ...it, isDeleted: "Y" } : it
    );
    if (deletedCategories.length > 0) {
      changedCategories = changedCategories.concat(deletedCategories);
    }
    changedCategories.sort((a, b) => a.turn - b.turn);
    modifyCategories(changedCategories);
  };

  const handleClickUpAndDown = (ud, category, currentTurn, index) => {
    let prevCategory;
    let currentCategory;
    let nextCategory;
    if (ud === "U") {
      if (parseInt(currentTurn) === parseInt(minTurn)) {
        alert("더 이상 위로 순서변경이 불가능 합니다.");
        return;
      }

      prevCategory = categories[index - 1];
      currentCategory = { ...category, turn: prevCategory.turn };
      prevCategory = { ...prevCategory, turn: currentTurn };

      let changedCategories = categories.filter(
        (it) =>
          parseInt(it.id) !== parseInt(prevCategory.id) &&
          parseInt(it.id) !== parseInt(currentCategory.id)
      );

      changedCategories.push(prevCategory);
      changedCategories.push(currentCategory);

      if (deletedCategories.length > 0) {
        changedCategories = changedCategories.concat(deletedCategories);
      }

      changedCategories.sort((a, b) => a.turn - b.turn);

      modifyCategories(changedCategories);
    } else if (ud === "D") {
      if (parseInt(currentTurn) === parseInt(maxTurn)) {
        alert("더 이상 아래로 순서변경이 불가능 합니다.");
        return;
      }
      nextCategory = categories[currentTurn + 1];
      currentCategory = { ...category, turn: nextCategory.turn };
      nextCategory = { ...nextCategory, turn: currentTurn };

      let changedCategories = categories.filter(
        (it) =>
          parseInt(it.id) !== parseInt(currentCategory.id) &&
          parseInt(it.id) !== parseInt(nextCategory.id)
      );

      changedCategories.push(currentCategory);
      changedCategories.push(nextCategory);

      if (deletedCategories.length > 0) {
        changedCategories = changedCategories.concat(deletedCategories);
      }

      changedCategories.sort((a, b) => a.turn - b.turn);
      modifyCategories(changedCategories);
    }
  };

  return (
    <div className="CategoryList">
      <div className="categoryList_list_area">
        {categories.length > 0 ? (
          categories.map((it, index) => (
            <div className="categories_area" key={it.id}>
              <Category category={it} modifyCategory={modifyCategory} />
              <div className="categoryList_button_area">
                <Arrow
                  className="can_click"
                  width="26"
                  height="26"
                  transform="rotate(90)"
                  onClick={() => handleClickUpAndDown("U", it, it.turn, index)}
                />
                <Arrow
                  className="can_click"
                  width="26"
                  height="26"
                  transform="rotate(270)"
                  onClick={() => handleClickUpAndDown("D", it, it.turn, index)}
                />
                {it.name === "미지정" ? (
                  <TrashX
                    width="26"
                    height="26"
                    style={{ borderRadius: "0px", cursor: "default" }}
                  />
                ) : (
                  <Trash
                    className="can_click"
                    width="26"
                    height="26"
                    onClick={() => handleClickDelete(it.id)}
                  />
                )}
              </div>
            </div>
          ))
        ) : (
          <div>카테고리를 추가해 보세요!</div>
        )}
        <div className="categoryList_plus_area">
          <PlusIcon width="32" height="32" onClick={handleClickPlus} />
        </div>
      </div>
    </div>
  );
};
export default CagtegoryList;
