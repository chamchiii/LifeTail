import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { PostStateContext } from "../App";
import { PostDispatchContext } from "../App";
import { addToHeader } from "../util/AddHeader";

import ToastUiViewer from "../components/ToastUiViewer";
import Header from "../components/Header";
import Button from "../components/Button";
import axios from "axios";
import CommentList from "../components/CommentList";
import CommentEditor from "../components/CommentEditor";
import { dateToStringYMD } from "../util/DateUtill";

const PostPage = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const { post, accessToken, isSecretMode } = useContext(PostStateContext);
  const { callPost, callCategories, getViewedPost } =
    useContext(PostDispatchContext);

  const [data, setData] = useState();
  const [sameCategoryPost, setSameCategoryPost] = useState([]);
  const [commentList, setCommentList] = useState([]);

  useEffect(() => {
    if (post.length >= 1) {
      const targetPost = post.find((it) => parseInt(it.id) === parseInt(id));
      const sameCategoryPosts = post.filter(
        (it) => parseInt(it.categoryId) === parseInt(targetPost.categoryId)
      );
      const postIndex = sameCategoryPosts.findIndex(
        (it) => parseInt(it.id) === parseInt(targetPost.id)
      );
      if (targetPost) {
        setData(targetPost);
      } else {
        alert("존재하지 않는 글 입니다. 홈으로 이동합니다.");
        navigate("/", { replace: true });
      }
      if (targetPost) {
        setSameCategoryPost(prevNextPost(sameCategoryPosts, postIndex));
      }
    }
    if (id && !isSecretMode) {
      callComment(id);
      let viewedPost = [];
      const viewPost = JSON.parse(localStorage.getItem("viewedPost"));
      const uniqueViewedPost = Array.from(new Set(viewPost));
      if (uniqueViewedPost) {
        viewedPost = uniqueViewedPost.filter(
          (it) => parseInt(it) !== parseInt(id)
        );
      }
      viewedPost.push(id);
      localStorage.setItem("viewedPost", JSON.stringify(viewedPost));
      getViewedPost();
    }
  }, [id, post, isSecretMode]);

  const callComment = async (postId) => {
    await axios
      .get(`/api/comment/${postId}`)
      .then((res) => {
        const resCommentList = res.data.map((it) => ({
          id: it.id,
          postId: it.postId,
          writer: it.writer,
          password: it.password,
          content: it.content,
          createDt: dateToStringYMD(parseInt(it.createDt)),
          updateDt: dateToStringYMD(parseInt(it.updateDt)),
        }));
        setCommentList(resCommentList);
      })
      .catch((err) => console.log("callPost() ERROR : "));
  };

  const prevNextPost = (arr, index) => {
    if (arr.length === 0 || index < 0 || index >= arr.length) {
      return [];
    }
    const prevIndex = index - 1 >= 0 ? index - 1 : null;
    const nextIndex = index + 1 < arr.length ? index + 1 : null;

    const prevElement = prevIndex !== null ? arr[prevIndex] : null;
    const nextElement = nextIndex !== null ? arr[nextIndex] : null;

    return [prevElement, arr[index], nextElement];
  };

  const handleClickEdit = () => {
    navigate(`/edit/${id}`);
  };

  const handleClickDelete = async () => {
    let headers;
    if (accessToken && accessToken !== "") {
      headers = addToHeader(accessToken);
    }
    if (window.confirm("삭제하시겠습니까?")) {
      await axios
        .delete(`/api/post/${id}`, { headers })
        .then(() => {
          callPost();
          callCategories();
          navigate("/", { replace: true });
        })
        .catch((err) => console.log("handleClickDelete() ERROR : "));
    }
  };

  const handleClickAnotherPostTitle = (postId) => {
    navigate(`/post/${postId}`);
  };

  if (!data) {
    return <div>로딩중 입니다...</div>;
  } else {
    return (
      <div className="PostPage">
        <Header isEdit={false} search={true} />
        <div className="title_area">
          <h1>{data.title}</h1>
          <div className="information">
            <div className="user_name">
              {data.userId} · {data.createdDate}
            </div>
          </div>
          <div className="post_category">
            <button className="post_category_button">
              {data.categoryName}
            </button>
            <div className="post_page_button_area">
              <Button
                name={"post_delete"}
                text={"삭제하기"}
                type={"negative"}
                onClick={handleClickDelete}
              />
              <Button
                name={"post_edit"}
                text={"수정하기"}
                type={"default"}
                onClick={handleClickEdit}
              />
            </div>
          </div>
          <div className="another_post">
            <div className="this_post_category">{data.categoryName}</div>
            <ul className="another_post_title">
              {sameCategoryPost.length >= 1
                ? sameCategoryPost.map((it) =>
                    it ? (
                      <li
                        className={`another_post${
                          parseInt(it.id) === parseInt(id)
                            ? "_list_selected"
                            : "_list"
                        }`}
                        key={it.id}
                        onClick={() => handleClickAnotherPostTitle(it.id)}
                      >
                        {it.title}
                      </li>
                    ) : (
                      ""
                    )
                  )
                : "해당 카테고리에 글이 존재하지 않습니다..."}
            </ul>
          </div>
        </div>
        <div className="content_area">
          <ToastUiViewer content={data.content}></ToastUiViewer>
        </div>
        <CommentEditor postId={id} callComment={callComment} />
        <CommentList
          postId={id}
          commentList={commentList}
          callComment={callComment}
        />
      </div>
    );
  }
};

export default PostPage;
