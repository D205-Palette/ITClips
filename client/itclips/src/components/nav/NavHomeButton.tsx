import React from "react";
import { navStore } from "../../stores/navStore";

export default function HomeButton() {
  const isLoggedIn = navStore(state => state.isLoggedIn);

  return (
    <div className="font-bold text-xl">
      
      <a href={isLoggedIn ? "/home" : "/"}>IT Clips</a>
    </div>
  );
}
