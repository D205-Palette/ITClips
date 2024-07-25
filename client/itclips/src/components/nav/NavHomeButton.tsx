import React from "react";
import { navStore } from "../../stores/navStore";
import { Link } from "react-router-dom";
export default function HomeButton() {
  const isLoggedIn = navStore(state => state.isLoggedIn);

  return (
    <div className="font-bold text-xl">
      
      <Link to={isLoggedIn ? "my/bookmarklist" : "intro"}>IT Clips</Link>
    </div>
  );
}
