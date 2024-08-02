
import SearchBar from "../../components/main/MainSearchBar";
import { FC, useState } from "react";
import Roadmap from "../../components/main/Roadmap";
import MainTab from "../../components/main/MainTab";
import mainStore from "../../stores/mainStore";
import type { RoadmapSumType } from "../../types/RoadmapType";
import NoContent from "./NoContent";
import { FaPlus } from "react-icons/fa6";

const MyRoadmap: FC = () => {
  const roadmaps = mainStore((state) => state.roadmaps);
  const [filterText, changeFilterText] = useState("");

  // axios 해서 유저가 가진 모든 로드맵 정보들 가져온것
  const userRoadmaps: RoadmapSumType[] = [
    {
      id: 1,
      userId: 1,
      userName: "UserOne",
      title: "First Roadmap",
      description: "This is the description for the first roadmap",
      image:
        "https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp",
      isPublic: 1,
      createdAt: "2024-07-24T05:41:26",
      stepCnt: 3, // 단계수
      checkCnt: 1, // 체크된 단계수
      likeCnt: 4, // 좋아요 수
    },
    {
      id: 2,
      userId: 2,
      userName: "UserOne",
      title: "Second Roadmap",
      description: "This is the description for the first roadmap",
      image:
        "https://cdn.pixabay.com/photo/2017/07/31/17/12/water-2559064_1280.jpg",
      isPublic: 1,
      createdAt: "2024-07-24T05:41:26",
      stepCnt: 4, // 단계수
      checkCnt: 4, // 체크된 단계수
      likeCnt: 2, // 좋아요 수
    },
    {
      id: 2,
      userId: 2,
      userName: "UserOne",
      title: "Third Roadmap",
      description: "This is the description for the first roadmap",
      image:
        "https://cdn.pixabay.com/photo/2017/08/27/15/38/surfing-2686450_1280.jpg",
      isPublic: 1,
      createdAt: "2024-07-24T05:41:26",
      stepCnt: 2, // 단계수
      checkCnt: 1, // 체크된 단계수
      likeCnt: 17, // 좋아요 수
    },
    {
      id: 1,
      userId: 1,
      userName: "UserOne",
      title: "First Roadmap",
      description: "This is the description for the first roadmap",
      image:
        "https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp",
      isPublic: 1,
      createdAt: "2024-07-24T05:41:26",
      stepCnt: 3, // 단계수
      checkCnt: 1, // 체크된 단계수
      likeCnt: 4, // 좋아요 수
    },
    {
      id: 2,
      userId: 2,
      userName: "UserOne",
      title: "First Roadmap",
      description: "This is the description for the first roadmap",
      image:
        "https://cdn.pixabay.com/photo/2017/07/31/17/12/water-2559064_1280.jpg",
      isPublic: 1,
      createdAt: "2024-07-24T05:41:26",
      stepCnt: 4, // 단계수
      checkCnt: 4, // 체크된 단계수
      likeCnt: 2, // 좋아요 수
    },
    {
      id: 2,
      userId: 2,
      userName: "UserOne",
      title: "First Roadmap",
      description: "This is the description for the first roadmap",
      image:
        "https://cdn.pixabay.com/photo/2017/08/27/15/38/surfing-2686450_1280.jpg",
      isPublic: 1,
      createdAt: "2024-07-24T05:41:26",
      stepCnt: 2, // 단계수
      checkCnt: 1, // 체크된 단계수
      likeCnt: 17, // 좋아요 수
    },
  ];

  // 유저가 가진 모든 로드맵

  const filterdRoadmaps = userRoadmaps.filter(
    (roadmap) => roadmap.title.includes(filterText)
  );

  return (
    <>
      <div className="fixed z-10 w-7/12 bg-white">
        <MainTab />
        <SearchBar
          whatSearch={"로드맵"}
          filterText={filterText}
          changeFilterText={changeFilterText}
        />
      </div>

      <div className="absolute top-32 z-0 w-7/12">
      {filterdRoadmaps.length === 0 ? <NoContent content={"로드맵"}/> : <>
        {filterdRoadmaps.map((roadmap) => (
          <Roadmap roadmap={roadmap} />
        ))}</>}
      </div>
      <button className="fixed z-20 bottom-10 right-10">
        <FaPlus color="skyblue" size={56}/>
      </button>
    </>
  );
};

export default MyRoadmap;
