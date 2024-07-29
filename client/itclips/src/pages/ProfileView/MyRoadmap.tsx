import SearchBar from "../../components/main/MainSearchBar";
import { FC } from "react";
import Roadmap from "../../components/main/Roadmap";
import MainTab from "../../components/main/MainTab";
import mainStore from "../../stores/mainStore";

const MyRoadmap: FC = () => {

  const roadmaps = mainStore((state) => state.roadmaps)

  return (
    <>
      <MainTab />
      <SearchBar whatSearch={"로드맵"} />
      <div className="mb-2">
        <br />
      </div>
      {roadmaps.map((roadmap) =><Roadmap roadmap={roadmap} /> )}
      
    </>
  );
};

export default MyRoadmap;
