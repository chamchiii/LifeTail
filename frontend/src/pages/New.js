import ToastUiEditor from "../components/ToastUiEditor";
import {useContext, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {PostStateContext} from "../App";

const New = () => {
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
    <div className="New">
      <ToastUiEditor search={false} isEdit={true} isNew={true} />
    </div>
  );
};

export default New;
