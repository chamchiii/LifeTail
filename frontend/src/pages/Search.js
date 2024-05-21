import axios from "axios";
import { useParams } from "react-router-dom";

import { dateToStringYMD } from "../util/DateUtill";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import PostsList from "../components/PostsList";
import RightMenu from "../components/RightMenu";

const Search = () => {
  const { searchKeyword } = useParams();
  const [searchData, setSearchData] = useState([]);

  useEffect(() => {
    if (searchKeyword) {
      search();
    }
  }, [searchKeyword]);

  // useEffect(() => {
  //   if (searchData && searchData.length >= 1) {
  //     console.log("searchData", searchData);
  //   }
  // }, [searchData]);

  const search = async () => {
    await axios.get(`/api/post/search/${searchKeyword}`).then((res) => {
      const resMap = res.data.map((it) => {
        return {
          id: it.id,
          title: it.title,
          subtitle: it.subtitle,
          content: it.content,
          categoryId: it.category.id,
          categoryName: it.category.name,
          userIdPK: it.users.id, //유저번호(DB-sequence)
          userId: it.users.userId, //유저Id
          createdDate: dateToStringYMD(parseInt(it.createdDate)),
        };
      });
      setSearchData(resMap);
    });
  };

  return (
    <div className="Search">
      <Header />
      <div className="result_count_area">
        <div className="result_count">
          {
            searchData && searchData.length >= 1 ? (
              <span>
                &quot;<span className="text_high_light">{searchKeyword}</span>
                &quot; 검색 결과 총 &quot;
                <span className="text_high_light">{searchData.length}</span>
                &quot;개 검색되었습니다.
              </span>
            ) : (
              <span>{searchKeyword} 검색 결과가 없습니다.</span>
            )
            // ? `"${searchKeyword}" 검색 결과 총 ${searchData.length}개 검색되었습니다.`
            // : `"${searchKeyword} 검색 결과가 없습니다."`
          }
        </div>
      </div>
      <div className="content_area search_page">
        <div className="left_menu_wrapper"></div>
        <div className="post_list_wrapper">
          <PostsList post={searchData} isSearch={true} />
        </div>
        <div className="right_menu_wrapper">
          <RightMenu />
        </div>
      </div>
    </div>
  );
};

export default Search;
