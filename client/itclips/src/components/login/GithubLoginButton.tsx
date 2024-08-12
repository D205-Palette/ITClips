import { FaGithub } from "react-icons/fa";
import { API_BASE_URL } from "../../config";
import github_logo from "../../assets/images/github_logo.svg";

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
      
        <img
          className="w-8 h-8 bg-gray-100 border border-white rounded-full"
          src={github_logo}
          alt=""
        />
      
      <p>GitHub 로그인</p>
    </button>
  );
};

export default GithubLoginButton;
