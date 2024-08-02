import { FcGoogle } from "react-icons/fc";
import { API_BASE_URL } from '../../config';

const GoogleLoginButton = () => {
  const googleLoginUrl = `${API_BASE_URL}:8084/oauth2/authorize/google`;
  
  const loginWithGoogle = () => {    
    window.open(googleLoginUrl, "_blank", "width=500,height=600");
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
