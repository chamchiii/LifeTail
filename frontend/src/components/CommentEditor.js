import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { idCheck, pdCheck, commentCheck } from "../util/Regex";

const CommentEditor = ({ postId, callComment }) => {
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [comment, setComment] = useState("");
  const [nicknamePlaceholder, setNicknamePlaceholder] = useState("아이디");
  const [passwordPlaceholder, setPasswordPlaceholder] = useState("비밀번호");
  const [commentPlaceholder, setCommentPlaceholder] =
    useState("최소 5글자 이상 작성해 주세요.");
  const nicknameRef = useRef(null);
  const passwordRef = useRef(null);
  const commentRef = useRef(null);

  const handleChangeNickname = (e) => {
    setNickname(e.target.value);
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleChangeComment = (e) => {
    setComment(e.target.value);
  };

  const handleClickSubmit = async (e) => {
    e.preventDefault();
    if (!idCheck(nickname)) {
      setNickname("");
      nicknameRef.current.focus();
      setNicknamePlaceholder("3글자 이상의 영어or숫자or혼합");
      return;
    }
    if (!pdCheck(password)) {
      setPassword("");
      passwordRef.current.focus();
      setPasswordPlaceholder("3글자 이상의 영어or숫자or혼합");
      return;
    }
    if (!commentCheck(comment)) {
      setComment("");
      commentRef.current.focus();
      return;
    }
    await axios
      .post("/api/comment", {
        postId: postId,
        writer: nickname,
        password: password,
        content: comment,
      })
      .then((res) => {
        callComment(postId);
        setNickname("");
        setPassword("");
        setComment("");
        alert("댓글을 저장했습니다!!!");
      })
      .catch((err) => {
        console.log("handleClickSubmit() ERROR : ");
        alert("오류가 발생하였습니다.");
      });
  };

  return (
    <div className="CommentEditor">
      <form>
        <div className="comment_editor_writer_info_area">
          <label htmlFor="comment_editor_nickname">아이디 : &nbsp;</label>
          <input
            className="comment_editor_nickname"
            onChange={handleChangeNickname}
            placeholder={nicknamePlaceholder}
            ref={nicknameRef}
            value={nickname}
          />
          <label htmlFor="comment_editor_password">
            &nbsp;&nbsp;비밀번호 : &nbsp;
          </label>
          <input
            className="comment_editor_password"
            type="password"
            onChange={handleChangePassword}
            placeholder={passwordPlaceholder}
            ref={passwordRef}
            value={password}
          />
          <button
            className="comment_editor_savebtn"
            onClick={handleClickSubmit}
          >
            저장하기
          </button>
        </div>
        <div className="comment_editor_content_area">
          <textarea
            className="comnent_editor_content"
            onChange={handleChangeComment}
            placeholder={commentPlaceholder}
            value={comment}
            ref={commentRef}
          />
        </div>
      </form>
    </div>
  );
};

export default CommentEditor;
