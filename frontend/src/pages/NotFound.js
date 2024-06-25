import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";

const NotFound = ({ errCode }) => {
  const { code } = useParams();
  const [errorCode, setErrorCode] = useState(0);
  // const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (errCode > 0) {
      // setIsMobile(true);
      setErrorCode(errCode);
    }
    if (code) {
      setErrorCode(code);
    }
  }, [errCode, code]);

  const getErrorMessage = (errorCode) => {
    switch (parseInt(errorCode)) {
      case 0:
        return "해당되는 페이지를 찾을 수 없습니다.";
      case 1:
        return "로그인 후 사용해 주십시오.";
      case 2:
        return "관리자만 접근 가능한 페이지입니다.";
      case 3:
        return "모바일 페이지는 현재 개발 중에 있습니다. 불편을 드려 죄송합니다.";
      default:
        return "Sorry, the page you are looking for does not exist.";
    }
  };

  return (
    <div className="NotFound">
      <Header />
      <div className="notFound">
        <h1>404 - Page Not Found</h1>
        <p>{getErrorMessage(errorCode)}</p>
      </div>
    </div>
  );
};

export default NotFound;
