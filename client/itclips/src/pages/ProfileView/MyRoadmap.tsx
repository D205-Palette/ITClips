import SearchBar from "../../components/main/MainSearchBar";
import { FC } from "react";
import Roadmap from "../../components/main/Roadmap";
import MainTab from "../../components/main/MainTab";
import mainStore from "../../stores/mainStore";

const MyRoadmap: FC = () => {
  const roadmaps = mainStore((state) => state.roadmaps);

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
      },
      {
        id: 2,
        userName: "UserOne",
        title: "First Roadmap",
        description: "This is the description for the first roadmap",
        image: 'https://cdn.pixabay.com/photo/2017/07/31/17/12/water-2559064_1280.jpg',
        isPublic: 1,
        createdAt: "2024-07-24T05:41:26",
      },
      {
        id: 2,
        userName: "UserOne",
        title: "First Roadmap",
        description: "This is the description for the first roadmap",
        image: 'https://cdn.pixabay.com/photo/2017/08/27/15/38/surfing-2686450_1280.jpg',
        isPublic: 1,
        createdAt: "2024-07-24T05:41:26",
      },
    ];

  
  // 유저가 가진 모든 로드맵 id 넘버들 가져와서
  // 조회 하면서 일일히 진행도 % 계산해서 prop으로 넘겨주기

  return (
    <>
      <MainTab />
      <SearchBar whatSearch={"로드맵"} />
      <div className="mb-2">
        <br />
      </div>
      {userRoadmaps.map((roadmap) => (
        <Roadmap roadmapId={roadmap.id} />
      ))}
    </>
  );
};

export default MyRoadmap;
