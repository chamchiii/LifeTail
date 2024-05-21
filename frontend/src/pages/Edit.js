import ToastUiEditor from "../components/ToastUiEditor";

const Edit = () => {
  return (
    <div className="Edit">
      <ToastUiEditor search={false} isEdit={true} isNew={false} />
    </div>
  );
};

export default Edit;
