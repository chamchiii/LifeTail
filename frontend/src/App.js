import "./App.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import axios from "axios";
import { GoogleOAuthProvider } from "@react-oauth/google";

import Home from "./pages/Home";
import New from "./pages/New";
import PostPage from "./pages/PostPage";
import Edit from "./pages/Edit";
import { dateToStringYMD } from "./util/DateUtill";
import Search from "./pages/Search";
import LoginModal from "./pages/LoginModal";

export const PostStateContext = React.createContext();
export const PostDispatchContext = React.createContext();

function App() {
  const [post, setPost] = useState([]);
  const [postListLength, setPostListLength] = useState(0);
  const [category, setCategory] = useState([]);
  const [viewedPost, setViewedPost] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(-1);
  const [isSecertMode, setIsSecertMode] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [accessToken, setAccessToken] = useState("");

  const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

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
      .catch((error) =>
        console.log("page open error - call all post list", error)
      );
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
      .catch((err) => console.log("callCategories() ERROR : ", err));
  };

  // const callComment = async (postId) => {
  //   let commentList;
  //   await axios
  //     .get(`/api/comment/${postId}`)
  //     .then((res) => {
  //       const resCommentList = res.data.map((it) => ({
  //         id: it.id,
  //         postId: it.postId,
  //         writer: it.writer,
  //         password: it.password,
  //         content: it.content,
  //         createDt: it.createDt,
  //         updateDt: it.updateDt,
  //       }));
  //       commentList = resCommentList;
  //     })
  //     .catch((err) => console.log("callPost() ERROR : ", err));

  //   return commentList;
  // };

  const getViewedPost = () => {
    let localStorageViewedPost;
    try {
      localStorageViewedPost = JSON.parse(localStorage.getItem("viewedPost"));
    } catch {
      setIsSecertMode(true);
    }
    if (!isSecertMode && localStorageViewedPost) {
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
    setIsLogin(login);
  };

  const setToken = (token) => {
    setIsLogin(true);
    setAccessToken(token);
    try {
      localStorage.setItem("accessToken", token);
    } catch {
      setIsSecertMode(true);
    }
  };

  const deleteToken = () => {
    setIsLogin(false);
    setAccessToken("");
    try {
      localStorage.removeItem("accessToken");
    } catch {
      setIsSecertMode(true);
    }
  };

  const getToken = () => {
    let localStorageAccessToken;
    try {
      localStorageAccessToken = localStorage.getItem("accessToken");
    } catch {
      setIsSecertMode(true);
    }
    if (!isSecertMode && localStorageAccessToken) {
      setAccessToken(localStorageAccessToken);
      setIsLogin(true);
    }
  };

  const secertModeTest = () => {
    try {
      localStorage.setItem("secertModeTest", secertModeTest);
      localStorage.removeItem("secertModeTest");
    } catch {
      setIsSecertMode(true);
    }
  };

  useEffect(() => {
    secertModeTest();
    callPost();
    callCategories();
    getViewedPost();
    // getToken();
  }, []);

  useEffect(() => {
    console.log("accessToken : ", accessToken);
    console.log("isLogin : ", isLogin);
  }, [accessToken, isLogin]);

  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <PostStateContext.Provider
        value={{
          post,
          category,
          viewedPost,
          selectedCategoryId,
          postListLength,
          isSecertMode,
          isLogin,
          accessToken,
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
          }}
        >
          <BrowserRouter>
            <div className="App">
              <meta name="google-signin-client_id" content={googleClientId} />
              <script
                src="https://accounts.google.com/gsi/client"
                async
                defer
              ></script>
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
    </GoogleOAuthProvider>
  );
}

export default App;
