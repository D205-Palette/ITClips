// DetailInfo.tsx 는 유저의 정보(이름, 이메일, 소개글)를 보여주는 컴포넌트

import React from "react";

interface User {
  id?: number;
  nickname?: string;
  job?: string;
  bio?: string;
  gender?: boolean;
  email?: string;
  darkMode?: boolean;
  birth?: string;
}

const UserDetailInfo = (data: User) => {

  return (
    <div className="text-center w-full">
      <h2 className="text-lg md:text-2xl font-bold mb-1">{data.nickname || "Unknown"}</h2>
      <p className="text-gray-500 text-sm md:text-base mb-2 text-ellipsis truncate">{data.email || "No email"}</p>
      <p className="text-center text-xs md:text-sm  mb-6">{data.bio || "소개글이 없습니다."}</p>
    </div>
  );
};

export default UserDetailInfo;