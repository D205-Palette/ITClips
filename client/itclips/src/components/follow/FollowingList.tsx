// SearchMain.tsx 는 검색창 들어가면 제일 처음 나오는 컴포넌트

import { useState } from "react";

// components
import FollowingItem from "./FollowingItem";

// icons
import { FaList } from "react-icons/fa";
import { CiBoxList } from "react-icons/ci";
import { HiOutlineSquares2X2, HiMiniSquares2X2 } from "react-icons/hi2";

interface User {
  id: number;
  username: string;
  imageUrl: string;
  email: string;
  tag: string;
}

const FollowingList = () => {

  // 더미 데이터
  const data: User[] = [
    { id: 1, username: "고양양", imageUrl: "", email: "abc@gmail.com", tag: "#관심사1 #관심사2 #태그" },
    { id: 2, username: "고양양", imageUrl: "", email: "abc@gmail.com", tag: "#관심사1 #관심사2 #태그" },
    { id: 3, username: "고양양", imageUrl: "", email: "abc@gmail.com", tag: "#관심사1 #관심사2 #태그" },
    { id: 4, username: "고양양", imageUrl: "", email: "abc@gmail.com", tag: "#관심사1 #관심사2 #태그"},
  ]

  return (
    <div className="mt-4">
      <FollowingItem items={data} />
    </div>
  );
};

export default FollowingList;