// DetailInfo.tsx 는 유저의 정보(이름, 이메일, 소개글)를 보여주는 컴포넌트

import React from "react";

interface Comment {
  id: number;
  username:string;
  content: string;
}

interface Tag {
  id: number;
  content: string;
}

interface ItemProps {
  itemName: string;
  email: string;
  description: string;
  like: number;
  fav: number;
  tags: Tag[];
  comments: Comment[];
}

const DetailInfo = (data: ItemProps) => {

  return (
    <div className="text-center">
      <h2 className="text-xl font-bold mb-1">{data.itemName}</h2>
      <p className="text-gray-500 mb-2">{data.email}</p>
      <p className="text-center text-sm mb-6">{data.description}</p>
    </div>
  );
};

export default DetailInfo;