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
    // <div className="text-center w-full">
    //   <h2 className="text-xl font-bold mb-1  ">{data.title}</h2>
    //   {data.userName? <> <Link to={`/user/${data.userId}`} className="text-gray-500 mb-2 ">@{data.userName}</Link></>: <></>}
    //   {data.users?.map((user: any) => (
    //     <Link to={`/user/${user.id}`} className="text-gray-500 mb-2 me-1 ">@{user.nickName}</Link>
    //   ))}
    //   <div className="">
    //   <p className="text-center text-sm mt-4 mb-1">{data.description}</p>
    <div className="text-center">
      <h2 className="text-base md:text-xl font-bold mb-0.5 md:mb-1">{data.title}</h2>
      {data.userName ? (
        <Link to={`/user/${data.userId}`} className="text-xxs md:text-sm text-gray-500 mb-0.5 md:mb-2">
          @{data.userName}
        </Link>
      ) : null}
      {data.users?.map((user: any) => (
        <Link 
          key={user.id}
          to={`/user/${user.id}`} 
          className="text-xxs md:text-sm text-gray-500 mb-0.5 md:mb-2 me-0.5 md:me-1"
        >
          @{user.nickName}
        </Link>
      ))}
      <div className="px-1 md:px-4">
        <p className="text-start text-xxs md:text-sm mt-1 md:mt-4 mb-0.5 md:mb-1 line-clamp-2 md:line-clamp-none">
          {data.description}
        </p>
      </div>
    </div>
  );
};

export default ItemDetailInfo;
