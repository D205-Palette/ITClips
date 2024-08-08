import React from "react";

const Footer = () => {
  return (
    <div className="bg-black w-full h-full text-white py-5 px-16 text-left">
      <div className="flex justify-between">
        <div className="flex flex-col justify-between">
          <h1 className="font-extrabold text-2xl"><span className="text-blue-500">IT</span> Clips</h1>
          <p>ⓒ ITCLips Corp. All rights reserved.</p>
        </div>

        <div className="flex gap-x-10">
          <div className="flex flex-col">
            <h3 className="font-bold mb-3">서비스</h3>
            <a href="">홈</a>
            <a href="">구글 로그인</a>
            <a href="">깃허브 로그인</a>
          </div>
          <div className="flex flex-col ">
            <h3 className="font-bold mb-3">팀 팔레트</h3>
            <p>정진규 팀장</p>
            <p>김동준 팀원</p>
            <p>김민솔 팀원</p>
            <p>김세진 팀원</p>
            <p>김수정 팀원</p>
            <p>최형우 팀원</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
