import { FcGoogle } from "react-icons/fc";
import { API_BASE_URL } from '../../config';
import google_logo from "../../assets/images/google_logo.svg"

const GoogleLoginButton = () => {
  const GOOGLE_AUTH_URL = `${API_BASE_URL}:8084/oauth2/authorize/google`;  

  const loginWithGoogle = () => {        
    window.location.href = GOOGLE_AUTH_URL;
  };

  return (
    <button
      onClick={loginWithGoogle}
      type="button"
      className="btn btn-outline bg-base-100 w-3/4"
    >
      <img className="w-8 h-8" src={google_logo} alt="" />      
      <p>구글 로그인</p>
    </button>
  );
};

export default GoogleLoginButton;
