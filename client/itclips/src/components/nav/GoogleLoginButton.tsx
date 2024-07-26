import { useGoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";

const GoogleLoginButton = () => {
  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      console.log(tokenResponse);
      const google_access_token = tokenResponse.access_token;
    
    //   accesstoken을 통해 구글에서 유저정보 가져오는 로직
        axios
          .get("https://www.googleapis.com/oauth2/v3/userinfo", {
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`,
            },
          })
          .then((response) => {
            console.log(response.data);

            console.log(response.data.email)
            console.log(response.data.email_verified)
            const email = response.data.email
            const email_verified = response.data.email_verified

            window.location.href = `/socialsignup?email=${encodeURIComponent(email)}&email_verified=${email_verified}`

          })
          .catch((error) => {
            console.error("Failed to fetch user info:", error);
          });
    

      // google_acces_token을 백엔드 서버로 발송 (api 요청)
      axios
        .get("/user/refresh", {
          headers: {
            Authorization: `Bearer ${google_access_token}`,
          },
        })
        
        // access token과 가입 여부를 response 받음
        .then((response) => {
          // access_token 로컬스토리지에 저장
          // 가입 여부에 따라 회원가입 페이지 or 메인 페이지로 redirect
          console.log(response.data);
          const { access_token, isNewUser } = response.data;

          // access_token 로컬스토리지에 저장
          localStorage.setItem("access_token", access_token);
        
          // 가입 여부에 따라 회원가입 페이지 or 메인 페이지로 redirect
          if (isNewUser) {
            window.location.href = "/signup"; // 추가 정보 입력 페이지로 리다이렉트
          } else {
            window.location.href = "/my";
          }
        })        
        .catch((error) => {
          console.log("Failed to refresh token:", error);
        });

    },
    onError: (error) => {
      console.error("Login Failed:", error);
    },
  });

  return (
    <button
      onClick={() => login()}
      type="button"
      className="btn bg-base-100 w-full"
    >
      <FcGoogle className="w-10 h-10" />
    </button>
  );
};

export default GoogleLoginButton;

// import { GoogleLogin } from "@react-oauth/google";
// import { jwtDecode } from "jwt-decode";

// const GoogleLoginButton = () => {
//   return (
//     <button
//     className="btn w-full">
//         <GoogleLogin
        
        
//           type="icon"
//           onSuccess={(credentialResponse: any) => {
//             console.log(credentialResponse);
//           }}
//           onError={() => {
//             console.log("Login Failed");
//           }}
//         />
//     </button>
//   );
// };

// export default GoogleLoginButton;
