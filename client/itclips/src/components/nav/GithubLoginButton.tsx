import { useEffect } from "react";
import { FaGithub } from "react-icons/fa";

const CLIENT_ID = "Iv23lie348uhhJxQ9o5m";

const GithubLoginButton = () => {
  const loginWithGithub = () => {
    window.location.assign(
      "https://github.com/login/oauth/authorize?client_id=" + CLIENT_ID
    );
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
          className="btn bg-base-100 w-full"
        >
        <FaGithub className="w-10 h-10"/>
        </button>
    </div>
  );
};

export default GithubLoginButton;
