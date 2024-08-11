// DetailInfo.tsx 는 유저의 정보(이름, 이메일, 소개글)를 보여주는 컴포넌트

import React from "react";
import type { BookmarkListDetailType } from "../../../types/BookmarkListType";
import { Link } from "react-router-dom";
interface Comment {
  id: number;
  username: string;
  content: string;
}

interface Tag {
  id: number;
  content: string;
}

interface Item {
  title: string;
  users?: {id:number, nickName:string}[];
  description: string;
  userName?: string;
  userId?:number;
}

const ItemDetailInfo = (data: Item) => {
  return (
    <div className="text-center ">
      <h2 className="text-xl font-bold mb-1">{data.title}</h2>
      {data.userName? <> <Link to={`/user/${data.userId}`} className="text-gray-500 mb-2">{data.userName}</Link></>: <></>}
      {data.users?.map((user: any) => (
        <Link to={`/user/${user.id}`} className="text-gray-500 mb-2">{user.nickName}</Link>
      ))}
      <div className="px-4">
      <p className="text-start text-sm mt-4 mb-1">{data.description}</p>
      </div>
    </div>
  );
};

export default ItemDetailInfo;
