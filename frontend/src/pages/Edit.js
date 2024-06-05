import ToastUiEditor from "../components/ToastUiEditor";
import {useNavigate} from "react-router-dom";
import {PostStateContext} from "../App";
import {useContext, useEffect} from "react";

const Edit = () => {
  const {isLogin, userRole} = useContext(PostStateContext);
  const navigate = useNavigate();

  useEffect(() => {
    if(!isLogin){
      navigate("/error/1");
    }else if(isLogin && userRole !== "ADMIN"){
      navigate("/error/2");
    }
  }, [isLogin, userRole]);

  return (
    <div className="Edit">
      <ToastUiEditor search={false} isEdit={true} isNew={false} />
    </div>
  );
};

export default Edit;
