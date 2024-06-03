import Post from "./Post";
import { PostStateContext } from "../App";
import { useContext, useEffect, useState } from "react";
import Pagination from "../util/Pagination";

const PostsList = ({ isSearch, post }) => {
  const { selectedCategoryId } = useContext(PostStateContext);
  const [postList, setPostList] = useState([]);
  const [slicePostList, setSlicePostList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [countPerPage, setCountPerPage] = useState(10);

  useEffect(() => {
    if (!post && !selectedCategoryId) {
      return <div>로딩중...</div>;
    } else {
      if (parseInt(selectedCategoryId) === -1) {
        setPostList(post);
      } else {
        const targetPosts = post.filter(
          (it) => parseInt(it.categoryId) === parseInt(selectedCategoryId)
        );
        setPostList(targetPosts);
      }
    }
  }, [post, selectedCategoryId]);

  useEffect(() => {
    if (postList) {
      const firstCountIndex = (currentPage - 1) * countPerPage;
      const lastCountIndex = firstCountIndex + countPerPage;
      const slice = postList.slice(firstCountIndex, lastCountIndex);
      setSlicePostList(slice);
    }
  }, [postList, currentPage, countPerPage]);

  return (
    <div className="PostList">
      <section className="postsList">
        {slicePostList.length > 0 ? (
          slicePostList.map((it) => <Post key={it.id} data={it}></Post>)
        ) : (
          <div className="no_posts_with_category">
            해당 카테고리에는 글이 없습니다.
          </div>
        )}
      </section>
      <Pagination
        totalCount={postList.length}
        countPerPage={countPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

PostsList.defaultProps = {
  isSearch: false,
};

export default PostsList;
