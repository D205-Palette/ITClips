import React from "react";
import { useStore } from '../store';

export default function HomeButton() {
  const isLoggedIn = useStore(state => state.isLoggedIn);

  return (
    <div className="font-bold text-xl">
      
      <a href={isLoggedIn ? "/home" : "/intro"}>IT Clips</a>
    </div>
  );
}
