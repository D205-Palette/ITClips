import React from "react";
import { useNavigate } from "react-router-dom";
import Intro1 from "../assets/images/Intro1.svg";
import Intro2 from "../assets/images/Intro2.svg";
import Intro3 from "../assets/images/Intro3.svg";

const Intro: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center w-full min-h-[800px]">
      {/* 첫 번째 섹션 */}
      <div className="w-full h-[1024px] flex items-center justify-between px-[109px]">
        <div className="flex flex-col justify-center gap-[30px]">
          <div className="text-left text-base-content dark:text-base-content text-[45px] font-bold">
            나만의 북마크 클라우드
          </div>
          <div className="text-left text-base-content dark:text-base-content text-[35px] font-normal">
            나의 북마크를
            <br />
            분류하고
            <br />
            관리해보세요
          </div>
        </div>
        <div className="w-[750px] h-[746px] rounded-tl-[48px] rounded-bl-[48px] overflow-hidden">
          <img
            className="w-full h-full object-cover"
            src={Intro1}
            alt="Intro"
          />
        </div>
      </div>

      {/* 두 번째 섹션 */}
      <div className="w-full h-[1005px] bg-base-100 flex items-center justify-between px-[109px]">
        {/* 왼쪽 이미지 */}
        <div className="w-[750px] h-[746px] rounded-tr-[48px] rounded-br-[48px] overflow-hidden">
          <img
            className="w-full h-full object-cover"
            src={Intro2}
            alt="Intro"
          />
        </div>

        {/* 오른쪽 텍스트 */}
        <div className="flex flex-col justify-center gap-[30px]">
          <div className="text-left text-base-content dark:text-base-content text-[45px] font-bold">
            북마크 리스트 공유
          </div>
          <div className="text-left text-base-content dark:text-base-content text-[35px] font-normal">
            나만의 북마크 리스트를
            <br />
            다른 사람과 공유하여
            <br />
            지식 및 관심사도
            <br />
            나눠볼까요?
          </div>
        </div>
      </div>

      {/* 네 번째 섹션 */}
      <div className="w-full h-[1024px] bg-base-100 flex items-center justify-between px-[109px]">
        {/* 왼쪽 텍스트 */}
        <div className="flex flex-col justify-center gap-[30px]">
          <div className="text-left text-base-content dark:text-base-content text-[45px] font-bold">
            관심 북마크, 로드맵 큐레이션
          </div>
          <div className="text-left text-base-content dark:text-base-content text-[35px] font-normal">
            관심사에 맞는 북마크와
            <br />
            저장한 북마크 기반의
            <br />
            학습 로드맵을
            <br />
            추천 받을 수 있습니다.
          </div>
        </div>

        {/* 오른쪽 이미지 */}
        <div className="w-[593px] h-[593px] rounded-tl-[48px] rounded-bl-[48px] overflow-hidden">
          <img
            className="w-full h-full object-cover"
            src={Intro3}
            alt="Intro"
          />
        </div>
      </div>

      {/* 다섯 번째 섹션 */}
      <div className="w-full min-h-[800px] bg-gradient-to-b from-base-100 via-blue-300 to-blue-500 dark:via-blue-800 dark:to-blue-900 flex flex-col items-center justify-center px-16 pt-24 pb-24">
        <div className="text-center text-white text-[55px] font-bold">
          지금 시작해 볼까요?
        </div>
        <div className="flex items-center justify-center w-full mt-8">
          <button
            onClick={() => navigate("/login")}
            className="px-8 py-4 text-xl rounded-md bg-gray-800 dark:bg-gray-600 text-white dark:text-gray-100 hover:bg-gray-700 dark:hover:bg-gray-500 transition-colors duration-300"
          >
            나만의 북마크 리스트 만들어보기 →
          </button>
        </div>
      </div>
    </div>
  );
};

export default Intro;
