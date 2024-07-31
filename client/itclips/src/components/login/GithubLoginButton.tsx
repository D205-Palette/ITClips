import { useEffect } from "react";
import { FaGithub } from "react-icons/fa";
import { GITHUB_API_KEY } from '../../config';

const GithubLoginButton = () => {
  const githubLoginUrl = `https://github.com/login/oauth/authorize?client_id=${GITHUB_API_KEY}`;
  
  const loginWithGithub = () => {    
    window.open(githubLoginUrl, "_blank", "width=500,height=600");
  };

  useEffect(() => {
    const queryString = window.location.search;
    const urlparams = new URLSearchParams(queryString);
    const codeParam = urlparams.get("code");
    console.log(codeParam);
  }, []);

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
