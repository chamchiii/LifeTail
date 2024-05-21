import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { PostDispatchContext } from "../App";

const Post = ({ data, isSecertMode }) => {
  const navigate = useNavigate();
  const [firstImg, setFirstImg] = useState("");
  const { getViewedPost } = useContext(PostDispatchContext);

  let viewedPost = [];
  const addViewedPost = (it) => {
    viewedPost.push(it);
  };

  const goDetail = () => {
    if (!isSecertMode) {
      const viewPost = JSON.parse(localStorage.getItem("viewedPost"));
      if (viewPost) {
        viewedPost = viewPost.map((it) => it);
      }
      addViewedPost(data.id);
      localStorage.setItem("viewedPost", JSON.stringify(viewedPost));
      getViewedPost();
    }
    navigate(`/post/${data.id}`);
  };

  useEffect(() => {
    if (data) {
      const pattern = /<img[^>]*src=["']?([^"']+)["']?[^>]*>/g;
      const sourceContent = data.content;
      const match = pattern.exec(sourceContent);

      if (match) {
        const imgTag = match[1];
        setFirstImg(imgTag);
      }
    }
  }, [data]);

  return (
    <div className="Post">
      <img src={firstImg} onClick={goDetail} alt="첫 번째 이미지" />
      <div className="title">
        <h2 onClick={goDetail}>{data.title}</h2>
      </div>
      <div className="content">
        <div onClick={goDetail}>{data.subtitle}</div>
      </div>
      <div className="post_category">
        <div>{data.categoryName}</div>
      </div>
      <div className="date">{data.createdDate}</div>
    </div>
  );
};

export default Post;
