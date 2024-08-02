import React from "react";
import { authStore } from "../../stores/authStore";
import { Link } from "react-router-dom";

export default function HomeButton() {
  const { isLoggedIn, userInfo } = authStore();

  return (
    <div className="font-bold text-xl">
      <Link to={isLoggedIn ? `user/${userInfo.id}` : "intro"}>IT Clips</Link>
    </div>
  );
}
