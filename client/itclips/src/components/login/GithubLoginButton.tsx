import { FaGithub } from "react-icons/fa";
import { API_BASE_URL } from '../../config';

const GithubLoginButton = () => {
  const githubLoginUrl = `${API_BASE_URL}/oauth2/authorize/github`;
  
  const loginWithGithub = () => {    
    window.open(githubLoginUrl, "_blank", "width=500,height=600");
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
