import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { commentCheck } from "../util/Regex";

const Comment = ({ comment, callComment }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [password, setPassword] = useState("");
  const [changedContent, setChangedContent] = useState(comment.content);
  const passwordRef = useRef(null);
  const contentRef = useRef(null);

  const deleteComment = async () => {
    if (comment.password !== password) {
      alert("저장시 작성한 비밀번호가 다릅니다.");
      passwordRef.current.focus();
      return;
    }
    await axios
      .delete(`/api/comment/${comment.id}`)
      .then((res) => callComment(comment.postId))
      .catch((err) => console.log("deleteComment() ERROR : ", err));
  };

  const updateComment = async () => {
    if (!commentCheck(changedContent)) {
      alert("댓글은 5글자 이상 작성해 주시기 바랍니다.");
      contentRef.current.focus();
      return;
    }
    if (comment.password !== password) {
      alert("저장시 작성한 비밀번호가 다릅니다.");
      passwordRef.current.focus();
      return;
    }
    await axios
      .put("/api/comment", {
        id: comment.id,
        content: changedContent,
      })
      .then((res) => callComment(comment.postId))
      .catch((err) => console.log("updateComment() ERROR : ", err));
  };

  const handleChangeContent = (e) => {
    setChangedContent(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleClickDeleteBtn = () => {
    setIsDelete(true);
    setIsEdit(false);
  };

  const handleClickUpdateBtn = () => {
    setIsDelete(false);
    setIsEdit(true);
  };

  const handleClickCancleBtn = () => {
    if (isEdit) {
      setChangedContent(comment.content);
    }
    setIsDelete(false);
    setIsEdit(false);
  };

  useEffect(() => {}, [changedContent]);

  return (
    <div className="Comment">
      <div className="comment_info_area">
        <div className="comment_info_writer">
          {comment.writer} / {comment.id} / {comment.password}
        </div>
        <div className="comment_info_create_date">{comment.createDt}</div>
      </div>
      <div className="comment_content_area">
        <div className="comment_content">
          {isEdit ? (
            <textarea
              className="comment_content_content"
              onChange={handleChangeContent}
              value={changedContent}
              placeholder={comment.content}
              ref={contentRef}
            />
          ) : (
            <pre>{comment.content}</pre>
          )}
        </div>
      </div>
      <div className="comment_button_area">
        {isDelete ? (
          <>
            <input
              className={"comment_button_password"}
              onChange={handleChangePassword}
              placeholder="저장시 비밀번호."
              value={password}
              type="password"
              ref={passwordRef}
            />
            <button
              className="comment_button delete_btn"
              onClick={handleClickCancleBtn}
            >
              취소
            </button>
            <button className="comment_button" onClick={deleteComment}>
              삭제
            </button>
          </>
        ) : isEdit ? (
          <>
            <input
              className={"comment_button_password"}
              onChange={handleChangePassword}
              placeholder="저장시 비밀번호."
              value={password}
              type="password"
              ref={passwordRef}
            />
            <button
              className="comment_button delete_btn"
              onClick={handleClickCancleBtn}
            >
              취소
            </button>
            <button className="comment_button" onClick={updateComment}>
              수정
            </button>
          </>
        ) : (
          <>
            <button className="comment_button" onClick={handleClickDeleteBtn}>
              삭제
            </button>
            <button className="comment_button" onClick={handleClickUpdateBtn}>
              수정
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Comment;
