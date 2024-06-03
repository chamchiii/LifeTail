import Modal from "react-modal";
import { PostDispatchContext } from "../App";
import { useContext, useEffect, useState } from "react";

import { ReactComponent as BackButton } from "../assets/icons/loginCancle.svg";
import { ReactComponent as LoginID } from "../assets/icons/loginID.svg";
import { ReactComponent as LoginPW } from "../assets/icons/loginPassword.svg";
import axios from "axios";

const LoginModal = ({ loginModalOpen }) => {
  const { handleToggleLoginModal, setToken } = useContext(PostDispatchContext);

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    setUserName("");
    setPassword("");
  }, [loginModalOpen]);

  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSignUpSubmit = async (e) => {
    if (
      !window.confirm(
        "회원가입을 진행하시겠습니까? 반드시 주의사항을 읽어주세요."
      )
    ) {
      return;
    }
    await axios
      .post("/auth/signup", {
        userId: userName,
        password: password,
      })
      .then((res) => {
        alert("회원가입이 완료되었습니다. 지금부터 로그인 가능합니다!!!");
        setUserName("");
        setPassword("");
      })
      .catch((err) => {
        if (err.response.status === parseInt(409)) {
          alert("존재하는 아이디 입니다.");
        }
        console.log("handleSignUpSubmit() ERROR : ");
      });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post("/auth/login", {
        userId: userName,
        password: password,
      })
      .then((res) => {
        setToken(res.data.accessToken);
        handleToggleLoginModal();
        setUserName("");
        setPassword("");
      })
      .catch((err) => {
        console.log("handleLoginSubmit() ERROR : ");
        if (parseInt(err.response.status) === 401)
          alert("비밀번호 오류 또는 등록되어 있지 않은 아이디입니다.");
      });
  };

  const handleClickBackBtn = () => {
    handleToggleLoginModal();
  };

  const customModalStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.4)",
      width: "100%",
      height: "100vh",
      zIndex: "100",
      position: "fixed",
      top: "0",
      left: "0",
    },
    content: {
      width: "400px",
      height: "520px",
      zIndex: "150",
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      borderRadius: "10px",
      boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.25)",
      backgroundColor: "var(--light-bg-100)",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      // justifyContent: "center",
      alignItems: "center",
      fontFamily: "Noto Sans KR",
      animation: "modalAppear 0.1s ease-in-out",
      padding: "20px",
      gap: "3px",
    },
  };

  return (
    <div className="LoginModal">
      <Modal
        isOpen={loginModalOpen}
        onRequestClose={handleToggleLoginModal}
        style={customModalStyles}
      >
        <div className="login_btn_area">
          <BackButton width="20" height="20" onClick={handleClickBackBtn} />
        </div>
        <div className="login_title_area">
          <div className="login_title">ID 로그인</div>
        </div>
        <div className="login_user_info_area">
          <form>
            <div className="login_user_info_id">
              <LoginID className="LoginID" width="26" height="26" />
              <input
                type="text"
                id="userName"
                value={userName}
                onChange={handleUserNameChange}
                placeholder="아이디"
                required
              />
            </div>
            <div className="login_user_info_password">
              <LoginPW className="LoginPW" width="26" height="26" />
              <input
                type="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="비밀번호"
                required
              />
            </div>
            <div className="login_signup_btn_area">
              <button
                className="signup_btn"
                onClick={handleSignUpSubmit}
                type="button"
              >
                회원가입
              </button>
              <button
                className="login_btn"
                onClick={handleLoginSubmit}
                type="submit"
              >
                로그인
              </button>
            </div>
          </form>
        </div>
        <div className="login_caution_area">
          <h2>주의사항</h2>
          <div className="login_caution">
            <br />
            <ol>
              <li>
                아이디 및 비밀번호 작성 후 회원가입 버튼을 누를 시 아이디가
                등록되어 있지 않다면 회원가입이 진행됩니다.
              </li>
              <li>
                아이디와 비밀번호 생성 규칙은 영어, 한글, 숫자를 사용한 4글자
                이상 아무 문자입니다.
              </li>
              <li>
                댓글은 로그인을 하지 않아도 작성하실 수 있습니다. 로그인 후 댓글
                작성 시 로그인된 아이디로 작성됩니다.
              </li>
              <li>
                <span className="highlight">
                  개인 프로젝트입니다. 암호화 후 비밀번호를 저장하고 있지만
                  그래도 절대 개인정보가 포함되지 않고 사용하지 않는 아이디 및
                  비밀번호를 사용해 주세요. <br />
                </span>
                <span className="example">예) qwer / 1234, 구경꾼1 / asdf</span>
              </li>
            </ol>
          </div>
        </div>
      </Modal>
    </div>
  );
};

LoginModal.defaultProps = {
  loginModalOpen: false,
};

export default LoginModal;
