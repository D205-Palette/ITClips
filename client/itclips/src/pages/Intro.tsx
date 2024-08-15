import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import intro1 from "../assets/images/intro1.gif"
import intro2 from "../assets/images/intro2.gif"
import intro3 from "../assets/images/intro3.gif"

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
    window.scrollTo(0,0)
  }, []);

  return (
    <div className="flex flex-col items-center w-full">
      {/* 첫 번째 섹션 */}
      <div
        id="intro1"
        className={`w-full md:min-h-screen bg-base-100 flex flex-col md:flex-row items-center px-6 md:px-16 lg:px-28 py-16 transition-transform ${
          inView.intro1 ? "animate-fadeInRight" : "opacity-0"
        }`}
        ref={refIntro1}
      >
        <div className="flex flex-col justify-center gap-4 md:gap-8 w-full md:w-1/3">
          <h2 className="text-left text-base-content text-xl sm:text-2xl lg:text-4xl font-bold">
            나만의 북마크 클라우드
          </h2>
          <div className="flex flex-col gap-y-2 md:gap-y-3 text-left text-base-content text-xl sm:text-2xl lg:text-3xl font-normal">
            <p>나의 북마크를</p>
            <p>분류하고</p>
            <p>관리해보세요.</p>
          </div>
        </div>
        <div className="border w-full md:w-2/3 mt-8 rounded-xl overflow-hidden">
          <img
            className="w-full border object-cover"
            src={intro1}
            alt="Intro"
          />
        </div>
      </div>

      {/* 두 번째 섹션 */}
      <div
        id="intro2"
        className={`w-full md:min-h-screen bg-base-100 flex flex-col md:flex-row items-center px-6 md:px-16 lg:px-28 py-16 transition-transform md:gap-x-8 ${
          inView.intro2 ? "animate-fadeInLeft" : "opacity-0"
        }`}
        ref={refIntro2}
      >
        <div className="flex flex-col justify-center gap-4 md:gap-8 w-full md:w-1/3">
          <div className="text-left text-base-content text-xl sm:text-2xl lg:text-4xl font-bold">
            북마크 리스트 공유
          </div>
          <div className="flex flex-col gap-y-2 md:gap-y-3 text-left text-base-content text-xl sm:text-2xl lg:text-3xl font-normal">
            <p>나만의 북마크 리스트를</p>
            <p>다른 사람과 공유하여</p>
            <p>지식 및 관심사도</p>
            <p>나눠볼까요?</p>
          </div>
        </div>
        <div className="border w-full md:w-2/3 mt-8 rounded-xl overflow-hidden">
          <img
            className="w-full h-full object-cover"
            src={intro2}
            alt="Intro"
          />
        </div>
      </div>

      {/* 세 번째 섹션 */}
      <div
        id="intro3"
        className={`w-full md:min-h-screen bg-base-100 flex flex-col md:flex-row items-center  px-6 md:px-16 lg:px-28 py-16 transition-transform ${
          inView.intro3 ? "animate-fadeInRight" : "opacity-0"
        }`}
        ref={refIntro3}
      >
        <div className="flex flex-col justify-center gap-4 md:gap-8 w-full md:w-1/3">
          <div className="text-left text-base-content text-xl sm:text-2xl lg:text-4xl font-bold">
            북마크리스트 큐레이션
          </div>
          <div className="flex flex-col gap-y-2 md:gap-y-3 text-left text-base-content text-xl sm:text-2xl lg:text-3xl font-normal">
            <p>관심사에 맞는</p>
            <p>북마크리스트를</p>            
            <p>추천 받을 수 있습니다.</p>
          </div>
        </div>
        <div className="border w-full md:w-2/3 mt-8 rounded-xl overflow-hidden">
          <img
            className="w-full h-full object-cover"
            src={intro3}
            alt="Intro"
          />
        </div>
      </div>

      {/* 네 번째 섹션 */}
      <div className="w-full min-h-screen bg-gradient-to-b from-base-100 via-blue-300 to-blue-500 flex flex-col items-center justify-center px-6 md:px-16 lg:px-28 py-16 md:py-24">
        <div
          id="startPrompt"
          ref={refStartPrompt}
          className={`text-center text-white text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold transition-opacity ${
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
            className={`px-6 md:px-8 py-3 md:py-4 text-lg sm:text-xl md:text-2xl rounded-md bg-gray-800 text-white hover:bg-gray-700 transition-colors duration-300 ${
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
