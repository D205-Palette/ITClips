import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const OAuthNaver = () => {
  const navigate = useNavigate();
  // 주소 파싱
  const code = new URL(window.location.href).searchParams.get("code");

  const [loginuser, setLoginUser] = useState({})
  const [IsLogin, setIsLogin] = useState(false)  
  const [nickname, setNickname] = useState("");

  function onNaverLogin(code:any) {
    setIsLogin(true)

    // async function requestNaverLogin(code:any) {       

    //     try {
    //       const { data } = await axios.get(`/oauth2/code/naver?code=${code}`);
      
    //       if (data.flag === "oauth_join_success & login_success" || data.flag === "login_success") {
    //         return data.data;
    //       } else {
    //         alert("로그인이 정상적으로 완료되지 않았습니다. 다시 시도해주시겠어요?");
    //       }
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   }

    // requestNaverLogin(code).then((response:any) => {
    //   const resData = response[0];

    //   window.localStorage.setItem("accessToken", resData.accessToken);
    //   window.localStorage.setItem("refreshToken", resData.refreshToken);
    //   window.localStorage.setItem("id", resData.id);
    //   window.localStorage.setItem("nickName", resData.nickName);
    //   window.localStorage.setItem("profileImg", resData.profileImg);
    //   window.localStorage.setItem("areaLat", resData.areaLat);
    //   window.localStorage.setItem("areaLng", resData.areaLng);
    //   window.localStorage.setItem("oauth", resData.oauth);
    //   setNickname(resData.nickName);

    //   console.log(response[0]);

    //   setLoginUser({
    //     id: resData.id,
    //     nickName: resData.nickName,
    //     manner: resData.manner,
    //     point: resData.point,
    //     profileImg: resData.profileImg,
    //     areaLng: resData.areaLng,
    //     areaLat: resData.areaLat,
    //     oauth: resData.oauth,
    //   });

    //   setIsLogin(true)
    // });
  }

  useEffect(() => {
    onNaverLogin(code);
  }, []);

//   useEffect(() => {
//     if (nickname !== "") {
//       setTimeout(() => {
//         if (nickname.includes("#")) {
//           navigate("/socialnickname", { state: { url: "/" } });
//         } else navigate("/");
//       }, 1500);
//     }
//   }, [nickname]);

  return (
    <div>
      <p>주소창 코드 : {code}</p>      
    </div>
  );
};


export default OAuthNaver;