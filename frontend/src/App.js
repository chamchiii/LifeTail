import "./App.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import axios from "axios";

import Home from "./pages/Home";
import New from "./pages/New";
import PostPage from "./pages/PostPage";
import Edit from "./pages/Edit";
import { dateToStringYMD } from "./util/DateUtill";
import Search from "./pages/Search";
import LoginModal from "./components/LoginModal";


export const PostStateContext = React.createContext();
export const PostDispatchContext = React.createContext();

function App() {
  const [post, setPost] = useState([]);
  const [postListLength, setPostListLength] = useState(0);
  const [category, setCategory] = useState([]);
  const [viewedPost, setViewedPost] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(-1);
  const [isSecretMode, setIsSecretMode] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [accessToken, setAccessToken] = useState("");
  const [userRole, setUserRole] = useState("");
  const [userId, setUserId] = useState("");
  const [categoryPlusModal, setCategoryPlusModal] = useState(false);

  const callPost = async () => {
    await axios
      .get("/api/post")
      .then((res) => {
        console.log("res.data : ", res.data);
        const resMap = res.data.map((it) => {
          return {
            id: it.id,
            title: it.title,
            subtitle: it.subtitle,
            content: it.content,
            categoryId: it.category.id,
            categoryName: it.category.name,
            userIdPK: it.users.id, //유저번호(DB-sequence)
            userId: it.users.userId, //유저Id
            createdDate: dateToStringYMD(parseInt(it.createdDate)),
          };
        });
        setPost(resMap);
        setPostListLength(resMap.length);
      })
      .catch((err) => console.log("page open error - call all post list"));
  };

  const callCategories = async () => {
    await axios
      .get("/api/category")
      .then((res) => {
        const responseToMap = res.data.map((it) => ({
          id: it.id,
          name: it.name,
          count: it.count,
        }));
        setCategory(responseToMap);
      })
      .catch((err) => console.log("callCategories() ERROR : "));
  };

  const getViewedPost = () => {
    let localStorageViewedPost;
    try {
      localStorageViewedPost = JSON.parse(localStorage.getItem("viewedPost"));
    } catch {
      // setIsSecretMode(true);
      console.log("getViewedPost() ERROR : ");
    }
    if (!isSecretMode && localStorageViewedPost) {
      setViewedPost(localStorageViewedPost.reverse());
    }
  };

  const changeCategoryId = (categoryId) => {
    setSelectedCategoryId(categoryId);
  };

  const handleToggleLoginModal = () => {
    setLoginModalOpen(!loginModalOpen);
  };

  const handleToggleLogin = (login) => {
    if (login) {
      setIsLogin(login);
    } else {
      setIsLogin(login);
      setId("");
      setRole("");
      deleteToken();
    }
  };

  const setId = (id) => {
    setUserId(id);
  };

  const setRole = (role) => {
    setUserRole(role);
  };

  const setToken = (token) => {
    setTokenToLocalStorage(token);
    setAccessToken(token);
    const parseAccessToken = parseJwt(token);
    handleToggleLogin(true);
    setId(parseAccessToken.sub);
    setRole(parseAccessToken.auth);
  };

  const deleteToken = () => {
    setAccessToken("");
    deleteTokenFromLocalStorage();
  };

  const setTokenToLocalStorage = (token) => {
    try {
      localStorage.setItem("accessToken", token);
    } catch {
      console.log("setTokenToLocalStorage() ERROR : ");
    }
  };

  const getTokenFromLocalStorage = () => {
    let localStorageAccessToken;
    try {
      localStorageAccessToken = localStorage.getItem("accessToken");
    } catch {
      console.log("getTokenFromLocalStorage() ERROR : ");
      // setIsSecretMode(true);
    }
    if (!isSecretMode && localStorageAccessToken) {
      setAccessToken(localStorageAccessToken);
      setIsLogin(true);
    }
  };

  const deleteTokenFromLocalStorage = () => {
    try {
      localStorage.removeItem("accessToken");
      alert("로그아웃이 완료되었습니다.");
    } catch {
      alert("로그아웃 중 오류가 발생하였습니다.");
      console.log("deleteTokenFromLocalStorage() ERROR : ");
      // setIsSecretMode(true);
    }
  };

  const secretModeTest = () => {
    try {
      localStorage.setItem("secretModeTest", "secretModeTest");
      localStorage.removeItem("secretModeTest");
    } catch {
      // setIsSecretMode(true);
    }
  };

  const parseJwt = (token) => {
    let base64Url = token.split(".")[1];
    let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    let jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  };

  const handleToggleCategoryPlusModal = () => {
    setCategoryPlusModal(!categoryPlusModal);
  }

  useEffect(() => {
    // secretModeTest();
    callPost();
    callCategories();
    getViewedPost();
  }, []);

  useEffect(() => {
    if (!isSecretMode) {
      getTokenFromLocalStorage();
    }
  }, [isSecretMode]);

  useEffect(() => {
    if (accessToken) console.log("accessToken : ", accessToken);
    if (isLogin) console.log("isLogin : ", isLogin);
    console.log("시크릿모드 : ", isSecretMode);
  }, [accessToken, isLogin, isSecretMode]);

  return (
    <PostStateContext.Provider
      value={{
        post,
        category,
        viewedPost,
        selectedCategoryId,
        postListLength,
        isSecretMode,
        isLogin,
        accessToken,
        userId,
        userRole,
      }}
    >
      <PostDispatchContext.Provider
        value={{
          callPost,
          callCategories,
          getViewedPost,
          changeCategoryId,
          handleToggleLoginModal,
          handleToggleLogin,
          setToken,
          deleteToken,
          setId,
          setRole,
          handleToggleCategoryPlusModal,
        }}
      >
        <BrowserRouter>
          <div className="App">
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/new" element={<New />} />
                <Route path="/post/:id" element={<PostPage />} />
                <Route path="/edit/:id" element={<Edit />} />
                <Route
                  path="/post/search/:searchKeyword"
                  element={<Search />}
                />
              </Routes>
            </main>
            <LoginModal loginModalOpen={loginModalOpen} />
          </div>
        </BrowserRouter>
      </PostDispatchContext.Provider>
    </PostStateContext.Provider>
  );
}

export default App;
