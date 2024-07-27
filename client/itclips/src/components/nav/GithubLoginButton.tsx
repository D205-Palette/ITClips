import { useEffect } from "react";
import { FaGithub } from "react-icons/fa";

const CLIENT_ID = "Ov23liRxsIr391wl5nHQ";

const GithubLoginButton = () => {
  const githubLoginUrl = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}`;

  const loginWithGithub = () => {
    window.location.assign(githubLoginUrl);
  };

  useEffect(() => {
    const queryString = window.location.search;
    const urlparams = new URLSearchParams(queryString);
    const codeParam = urlparams.get("code");
    console.log(codeParam);
  }, []);

  return (
    <div>
      <button
        onClick={loginWithGithub}
        type="button"
        className="btn bg-base-100 w-3/4"
      >
        <FaGithub className="w-10 h-10" />
        <p>깃허브 로그인</p>
      </button>
    </div>
  );
};

export default GithubLoginButton;
