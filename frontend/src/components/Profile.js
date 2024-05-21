import React from "react";

import profile from "../assets/images/avatar.png";

const Profile = () => {
  return (
    <div className="Profile">
      <div className="profile_img">{<img src={profile} />}</div>
      <div className="profile_info">
        <div className="profile_name">이동원</div>
        <div className="profile_intro">자라나는 초짜 개발자</div>
      </div>
    </div>
  );
};

export default React.memo(Profile);
