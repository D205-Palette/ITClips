import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authStore } from "../../../stores/authStore";
import toastStore from "../../../stores/toastStore";
import { checkUserInfo } from "../../../api/authApi";

export default function Oauth2() {
  const { login, fetchUserToken, fetchUserId, fetchUserInfo } = authStore();
  const [accessToken, setAccessToken] = useState("");
  const [userId, setUserId] = useState<number | null>(null); // 초기값을 null로 설정
  const navigate = useNavigate();
  const { globalNotification, setGlobalNotification } = toastStore();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("accessToken");
    const id = urlParams.get("userId");

    if (token && id) {
      const userIdNumber = parseInt(id, 10);
      setUserId(userIdNumber);
      fetchUserId(userIdNumber); // 스토리지에 유저 아이디 갱신
          fetchUserToken(token); // 스토리지에 액세스 토큰 갱신
      setAccessToken(token);

      checkUserInfo(userIdNumber, userIdNumber)
        .then((response) => {
          fetchUserId(userIdNumber); // 스토리지에 유저 아이디 갱신
          fetchUserToken(token); // 스토리지에 액세스 토큰 갱신
          if (response.data.nickname) {
            fetchUserInfo(response.data); // 스토리지에 유저 정보 갱신
            login(); // 로그인 처리          
            navigate(`/user/${userIdNumber}`); // 로그인 후 이동할 페이지            
            setGlobalNotification({
              message: `환영합니다 ${response.data.nickname}님!`,
              type: "success",
            });
          } else {
            // 닉네임이 없는 경우: 추가 회원정보를 입력받기 위한 페이지로 리디렉션
            if (window.opener) {
              window.opener.postMessage(
                { type: "NEED_PROFILE_COMPLETION" },
                window.location.origin
              );
              window.close(); // 소셜 로그인 창을 닫음
            } else {
              navigate("/socialsignup"); // 추가 회원정보 입력 페이지
            }
          }
        })
        .catch((error) => {
          console.error("Error fetching user info:", error);
        });
    } else {
      console.error("Access token or user ID is missing in the URL");
    }
  }, [navigate, fetchUserInfo, fetchUserId, fetchUserToken, login]);

  return (
    <div>
      {/* <h2>OAuth2 Redirect Page</h2>
      <p>Access Token: {accessToken}</p>
      <p>User ID: {userId !== null ? userId : "Loading..."}</p> */}
    </div>
  );
}
