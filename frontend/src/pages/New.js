import Header from "../components/Header";
import ToastUiEditor from "../components/ToastUiEditor";

const New = () => {
  return (
    <div className="New">
      <Header search={false} isEdit={true} />
      <ToastUiEditor />
    </div>
  );
};

export default New;
