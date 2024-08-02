import { FcGoogle } from "react-icons/fc";
import { API_BASE_URL } from '../../config';

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
      <FcGoogle className="w-8 h-8" />
      <p>구글 로그인</p>
    </button>
  );
};

export default GoogleLoginButton;
