/// <reference types="react-scripts" />

interface ImportMetaEnv {
    readonly REACT_APP_LOCALHOST_URL: string;
    readonly REACT_APP_SERVER_URL: string;
    readonly REACT_APP_CLIENT_URL: string;
    readonly REACT_APP_GOOGLE_API_KEY: string;
    readonly REACT_APP_GITHUB_API_KEY: string;
    readonly REACT_APP_NAVER_API_KEY: string;
    readonly REACT_APP_KAKAO_API_KEY: string;
    readonly REACT_APP_GOOGLE_REDIRECT_URI: string;
    readonly REACT_APP_GITHUB_REDIRECT_URI: string;
    readonly REACT_APP_NAVER_REDIRECT_URI: string;
    readonly REACT_APP_KAKAO_REDIRECT_URI: string;
    readonly REACT_APP_LINKPREVIEW_API_KEY: string;
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }