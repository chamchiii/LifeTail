import React from 'react';
import {useParams} from "react-router-dom";
import Header from "../components/Header";

const NotFound = () => {
  const {code} = useParams(0);

  const getErrorMessage = (code) => {
    switch (code) {
      case '0':
        return '해당되는 페이지를 찾을 수 없습니다.';
      case '1':
        return '로그인 후 사용해 주십시오.';
      case '2':
        return '관리자만 접근 가능한 페이지입니다.'
      default:
        return 'Sorry, the page you are looking for does not exist.';
    }
  };

  return (
    <div className="NotFound">
      <Header/>

      <div className="notFound">
        <h1>404 - Page Not Found</h1>
        <p>{getErrorMessage(code)}</p>
      </div>
    </div>
  );
}

export default NotFound;