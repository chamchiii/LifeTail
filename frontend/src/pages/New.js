// import Header from "../components/Header";
import ToastUiEditor from "../components/ToastUiEditor";

const New = () => {
  return (
    <div className="New">
      {/* <Header search={false} isEdit={true} /> */}
      <ToastUiEditor search={false} isEdit={true} isNew={true} />
    </div>
  );
};

export default New;
