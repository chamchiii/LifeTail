import image from "../assets/images/test.png";

const Post = () => {
  return (
    <div className="Post">
      <img src={image} />
      <div className="title">
        <h2>제목</h2>
      </div>
      <div className="content">
        <div>content</div>
      </div>
      <div className="post_category">
        <div>카테고리</div>
        <div>카테고리</div>
      </div>
      <div className="date">날짜</div>
    </div>
  );
};

export default Post;
