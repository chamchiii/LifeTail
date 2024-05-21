import { Viewer } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";

const ToastUiEditor = ({ content }) => {
  return <Viewer initialValue={content}></Viewer>;
};
export default ToastUiEditor;
