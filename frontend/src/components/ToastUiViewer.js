import { Viewer } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import { useEffect, useRef } from "react";

const ToastUiEditor = ({ postContent }) => {
  const viewerRef = useRef();

  useEffect(() => {
    if (viewerRef.current && postContent.length > 0) {
      viewerRef.current.getInstance().setMarkdown(postContent);
    }
  }, [postContent]);

  return <Viewer ref={viewerRef}></Viewer>;
};
export default ToastUiEditor;
