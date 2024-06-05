import React, {useContext, useEffect, useRef, useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";
import Header from "../components/Header";
import {PostStateContext} from "../App";

import "@toast-ui/editor/dist/toastui-editor.css";
import {Editor} from "@toast-ui/react-editor";

import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import "tui-color-picker/dist/tui-color-picker.css";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
import "@toast-ui/editor/dist/i18n/ko-kr";

import {addToHeader} from "../util/AddHeader";

const ToastUiEditor = ({search, isEdit, isNew}) => {
  const editorRef = useRef(null);
  const {id} = useParams();
  const {post, accessToken} = useContext(PostStateContext);
  const [postContent, setPostContent] = useState("");
  const [targetPost, setTargetPost] = useState("");

  useEffect(() => {
    if (!id) {
      setPostContent("");
    } else {
      if (post.length > 0) {
        const initPost = post.find((it) => parseInt(it.id) === parseInt(id));
        editorRef.current.getInstance().setHTML(initPost.content);
        setTargetPost(initPost);
      } else {
        editorRef.current.getInstance().setHTML("");
      }
    }
  }, [id, post]);

  const onUploadImage = async (blob, callback) => {
    let headers;
    if (accessToken && accessToken !== "") {
      headers = addToHeader(accessToken);
    }
    const formData = new FormData();
    formData.append("image", blob);
    await axios
      .post("/api/post/image", formData, {headers})
      .then((res) => {
        callback(res.data);
      })
      .catch((err) => {
        console.log("onUploadImage() ERROR : ");
        switch (parseInt(err.response.status)){
          case 401:
            alert("인증되지 않은 사용자입니다. 회원가입 또는 로그인 후 재실행 부탁드립니다.");
            break;
          case 403:
            alert("관리자 권한이 부여되지 않은 사용자입니다.");
            break;
          default:
            alert("오류로 인하여 작업을 수행하지 못하였습니다.");
            break;
        }
      });
  };

  const handleChange = () => {
    setPostContent(editorRef.current.getInstance().getHTML());
  };

  return (
    <div className="ToastUiEditor">
      <Header
        search={search}
        isEdit={isEdit}
        isNew={isNew}
        content={{
          title: targetPost.title,
          subtitle: targetPost.subtitle,
          content: postContent,
          id: isNew ? "" : targetPost.id,
        }}
      />
      <Editor
        ref={editorRef}
        previewStyle="vertical"
        initialValue=" "
        initialEditType="markdown"
        useCommandShortcut={true}
        height="calc(100vh - 51px)"
        plugins={[colorSyntax]}
        language="ko-KR"
        usageStatistics={false}
        onChange={handleChange}
        hooks={{addImageBlobHook: onUploadImage}}
        toolbarItems={[
          ["heading", "bold", "italic", "strike"],
          ["hr", "quote"],
          ["ul", "ol", "task", "indent", "outdent"],
          ["table", "image", "link"],
          ["code", "codeblock"],
          ["scrollSync"],
        ]}
      />
    </div>
  );
};

export default ToastUiEditor;
