import { useContext, useEffect, useState } from "react";
import { PostStateContext } from "../App";
import { useNavigate } from "react-router-dom";

const RightMenu = () => {
  const { post, viewedPost, isSecretMode } = useContext(PostStateContext);
  const [viewedPostInfo, setViewedPostInfo] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (viewedPost) {
      const viewedPosts = viewedPost.map((postId) => {
        const targetPost = post.find(
          (it) => parseInt(it.id) === parseInt(postId)
        );
        return { id: postId, post: targetPost };
      });
      const availablePosts = viewedPosts.filter((it) => it.post);
      setViewedPostInfo(availablePosts.slice(0, 5));
    }
  }, [post, viewedPost]);

  const handleClickRecentTitle = (postId) => {
    const id = postId;
    navigate(`/post/${id}`);
  };

  return (
    <aside className="RightMenu">
      <div className="recently_view">최근 본 글</div>
      {viewedPostInfo.length > 0 ? (
        viewedPostInfo.map((it) => (
          <div
            className="recently_view_title"
            key={it.id}
            onClick={() => handleClickRecentTitle(it.id)}
          >
            {it.post.title}
          </div>
        ))
      ) : isSecretMode ? (
        <div className="recently_view_title_none">
          시크릿 모드로 접속하여 최근 본 글을 확인할 수 없습니다.
        </div>
      ) : (
        <div className="recently_view_title_none">최근 본 글이 없습니다.</div>
      )}
    </aside>
  );
};

export default RightMenu;
