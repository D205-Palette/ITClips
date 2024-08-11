import React from "react";
import { authStore } from "../../stores/authStore";
import { Link } from "react-router-dom";

export default function HomeButton() {
  const { isLoggedIn, userInfo, userId } = authStore();

  return (
    <>
      <Link to={isLoggedIn ? `user/${userId}` : "intro"}>
        <h1 className="font-extrabold text-2xl me-8">
          <span className="text-sky-500">IT</span> Clips
        </h1>
      </Link>
    </>
  );
}
