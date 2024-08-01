import SearchBar from "../../components/main/MainSearchBar";
import { FC,useState } from "react";
import Roadmap from "../../components/main/Roadmap";
import MainTab from "../../components/main/MainTab";
import mainStore from "../../stores/mainStore";

const MyRoadmap: FC = () => {
  const roadmaps = mainStore((state) => state.roadmaps);
  const [filterText, changeFilterText] = useState("")

  const userRoadmaps =
    // axios 해서 유저가 가진 모든 로드맵 정보들 가져온것
    [
      {
        id: 1,
        userName: "UserOne",
        title: "First Roadmap",
        description: "This is the description for the first roadmap",
        image: "https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp",
        isPublic: 1,
        createdAt: "2024-07-24T05:41:26",
        stepCnt: 3, // 단계수 
        checkCnt: 1, // 체크된 단계수 
        likeCnt: 4 // 좋아요 수 
      },
      {
        id: 2,
        userName: "UserOne",
        title: "First Roadmap",
        description: "This is the description for the first roadmap",
        image: 'https://cdn.pixabay.com/photo/2017/07/31/17/12/water-2559064_1280.jpg',
        isPublic: 1,
        createdAt: "2024-07-24T05:41:26",
        stepCnt: 4, // 단계수 
        checkCnt: 4, // 체크된 단계수 
        likeCnt: 2 // 좋아요 수 
      },
      {
        id: 2,
        userName: "UserOne",
        title: "First Roadmap",
        description: "This is the description for the first roadmap",
        image: 'https://cdn.pixabay.com/photo/2017/08/27/15/38/surfing-2686450_1280.jpg',
        isPublic: 1,
        createdAt: "2024-07-24T05:41:26",
        stepCnt: 2, // 단계수 
        checkCnt: 1, // 체크된 단계수 
        likeCnt: 17 // 좋아요 수 
      },
    ];

  
  // 유저가 가진 모든 로드맵 

  return (
    <>
      <MainTab />
      <SearchBar whatSearch={"로드맵"} filterText={filterText} changeFilterText={changeFilterText}/>
      <div className="mb-2">
        <br />
      </div>
      {userRoadmaps.map((roadmap) => (
        <Roadmap roadmap={roadmap} />
      ))}
    </>
  );
};

export default MyRoadmap;
