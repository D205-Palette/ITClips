import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Intro1 from "../assets/images/Intro1.svg";
import Intro2 from "../assets/images/Intro2.svg";
import Intro3 from "../assets/images/Intro3.svg";

const Intro: React.FC = () => {
  const navigate = useNavigate();
  const [inView, setInView] = useState({
    intro1: false,
    intro2: false,
    intro3: false,
    startPrompt: false,
    startButton: false,
  });

  const refIntro1 = useRef<HTMLDivElement>(null);
  const refIntro2 = useRef<HTMLDivElement>(null);
  const refIntro3 = useRef<HTMLDivElement>(null);
  const refStartPrompt = useRef<HTMLDivElement>(null);
  const refStartButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        const targetId = entry.target.id;
        if (entry.isIntersecting) {
          setInView((prevState) => ({ ...prevState, [targetId]: true }));
        } else {
          setInView((prevState) => ({ ...prevState, [targetId]: false }));
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.1,
    });

    if (refIntro1.current) observer.observe(refIntro1.current);
    if (refIntro2.current) observer.observe(refIntro2.current);
    if (refIntro3.current) observer.observe(refIntro3.current);
    if (refStartPrompt.current) observer.observe(refStartPrompt.current);
    if (refStartButton.current) observer.observe(refStartButton.current);

    return () => {
      if (refIntro1.current) observer.unobserve(refIntro1.current);
      if (refIntro2.current) observer.unobserve(refIntro2.current);
      if (refIntro3.current) observer.unobserve(refIntro3.current);
      if (refStartPrompt.current) observer.unobserve(refStartPrompt.current);
      if (refStartButton.current) observer.unobserve(refStartButton.current);
    };
  }, []);

  return (
    <div className="flex flex-col items-center w-full min-h-screen ">
      {/* 첫 번째 섹션 */}
      <div
        id="intro1"
        className={`w-full h-[1005px] bg-base-100 flex items-center justify-between px-28 py-16 transition-transform ${
          inView.intro1 ? "animate-fadeInRight" : "opacity-0"
        }`}
        ref={refIntro1}
      >
        <div className="flex flex-col justify-center gap-8">
          <h2 className="text-left text-base-content text-4xl font-bold">
            나만의 북마크 클라우드
          </h2>
          <div className="flex flex-col gap-y-3 text-left text-base-content text-3xl font-normal">
            <p>나의 북마크를</p>
            <p>분류하고</p>
            <p>관리해보세요</p>
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
      <div
        id="intro2"
        className={`w-full h-[1005px] bg-base-100 flex items-center justify-between px-28 py-16 transition-transform ${
          inView.intro2 ? "animate-fadeInLeft" : "opacity-0"
        }`}
        ref={refIntro2}
      >
        <div className="w-[750px] h-[746px] rounded-tr-[48px] rounded-br-[48px] overflow-hidden">
          <img
            className="w-full h-full object-cover"
            src={Intro2}
            alt="Intro"
          />
        </div>
        <div className="flex flex-col justify-center gap-8">
          <div className="text-left text-base-content text-4xl font-bold">
            북마크 리스트 공유
          </div>
          <div className="flex flex-col gap-y-3 text-left text-base-content text-3xl font-normal">
            <p>나만의 북마크 리스트를</p>
            <p>다른 사람과 공유하여</p>
            <p>지식 및 관심사도</p>
            <p>나눠볼까요?</p>
          </div>
        </div>
      </div>

      {/* 세 번째 섹션 */}
      <div
        id="intro3"
        className={`w-full h-[1024px] bg-base-100 flex items-center justify-between px-28 py-16 transition-transform ${
          inView.intro3 ? "animate-fadeInRight" : "opacity-0"
        }`}
        ref={refIntro3}
      >
        <div className="flex flex-col justify-center gap-8">
          <div className="text-left text-base-content text-4xl font-bold">
            관심 북마크, 로드맵 큐레이션
          </div>
          <div className="flex flex-col gap-y-3 text-left text-base-content text-3xl font-normal">
            <p>관심사에 맞는 북마크와</p>
            <p>저장한 북마크 기반의</p>
            <p>학습 로드맵을</p>
            <p>추천 받을 수 있습니다.</p>
          </div>
        </div>
        <div className="w-[593px] h-[593px] rounded-tl-[48px] rounded-bl-[48px] overflow-hidden">
          <img
            className="w-full h-full object-cover"
            src={Intro3}
            alt="Intro"
          />
        </div>
      </div>

      {/* 네 번째 섹션 */}
      <div className="w-full min-h-[700px] bg-gradient-to-b from-base-100 via-blue-300 to-blue-500 flex flex-col items-center justify-center px-16 py-24">
        <div
          id="startPrompt"
          ref={refStartPrompt}
          className={`text-center text-white text-5xl font-bold transition-opacity ${
            inView.startPrompt ? "animate-fadeInUp" : "opacity-0"
          }`}
        >
          지금 시작해 볼까요?
        </div>
        <div className="flex items-center justify-center w-full mt-8">
          <button
            id="startButton"
            ref={refStartButton}
            onClick={() => navigate("/login")}
            className={`px-8 py-4 text-xl rounded-md bg-gray-800 text-white hover:bg-gray-700 transition-colors duration-300 ${
              inView.startButton ? "animate-fadeInUp" : "opacity-0"
            }`}
          >
            나만의 북마크 리스트 만들어보기 →
          </button>
        </div>
      </div>
    </div>
  );
};

export default Intro;
