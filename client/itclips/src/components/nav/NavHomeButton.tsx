import React from "react";
import { authStore } from "../../stores/authStore";
import { Link } from "react-router-dom";
import darkModeStore from "../../stores/darkModeStore";
import HomeLogo from "../../assets/images/HomeLogo.png";

export default function HomeButton() {
  const { isDark } = darkModeStore();
  const { isLoggedIn, userInfo, userId } = authStore();

  return (
    <>
      <Link to={isLoggedIn ? `user/${userId}` : "intro"}>
        <h1 className="font-extrabold text-2xl me-8">
          <div className="flex items-center">
            <img src={HomeLogo} alt="" className="h-11"/>
            <span className="alfa-slab-one-regular text-xl">ITClips</span>
          
          </div>
        </h1>
      </Link>
    </>
  );
}
