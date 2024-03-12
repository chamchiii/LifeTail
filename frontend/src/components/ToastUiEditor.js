import React, { useRef } from "react";

import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";

const ToastUiEditor = () => {
  const editorRef = useRef();

  // const editorRef = React.createRef();

  return (
    <div className="ToastUiEditor">
      <Editor
        ref={editorRef}
        previewStyle="vertical"
        initialValue=" "
        initialEditType="markdown"
        useCommandShortcut={true}
        height="calc(100vh - 51px)"
      />
    </div>
  );
};

export default ToastUiEditor;
