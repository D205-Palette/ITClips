import { FaGithub } from "react-icons/fa";
import { API_BASE_URL } from '../../config';

const GithubLoginButton = () => {
  const GITHUB_AUTH_URL = `${API_BASE_URL}:8084/oauth2/authorize/github`;
  
  const loginWithGithub = () => {    
    window.location.href = GITHUB_AUTH_URL;
  };

  return (
    <button
      onClick={loginWithGithub}
      type="button"
      className="btn btn-outline bg-base-100 w-3/4"
    >
      <FaGithub className="w-8 h-8" />
      <p>깃허브 로그인</p>
    </button>
  );
};

export default GithubLoginButton;
