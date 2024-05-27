import { useEffect, useState } from "react";
import Comment from "./Comment";
import Pagination from "../util/Pagination";

const CommentList = ({ postId, commentList, callComment }) => {
  const [comments, setComments] = useState([]);
  const [sliceComments, setSliceComments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [countPerPage, setCountPerPage] = useState(10);

  useEffect(() => {
    if (commentList.length > 0) {
      setComments(commentList);
    }
  }, [commentList]);

  useEffect(() => {
    if (comments) {
      const firstCountIndex = (currentPage - 1) * countPerPage;
      const lastCountIndex = firstCountIndex + countPerPage;
      const slice = comments.slice(firstCountIndex, lastCountIndex);
      setSliceComments(slice);
    }
  }, [comments, currentPage, countPerPage]);

  return (
    <div className="CommentList">
      {sliceComments.length > 0 ? (
        sliceComments.map((it) => (
          <Comment
            key={it.id}
            postId={postId}
            comment={it}
            callComment={callComment}
          />
        ))
      ) : (
        <div className="no_commentList">
          작성된 댓글이 없습니다. 첫 번째 댓글을 작성해 보세요!!!
        </div>
      )}
      <Pagination
        totalCount={comments.length}
        countPerPage={countPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default CommentList;
