import SearchBar from "../../components/main/MainSearchBar";
import { FC, useState,useEffect } from "react";
import Roadmap from "../../components/main/Roadmap";
import MainTab from "../../components/main/MainTab";
import type { RoadmapSumType } from "../../types/RoadmapType";
import NoContent from "./NoContent";
import { FaPlus } from "react-icons/fa6";
import axios from "axios";
import { API_BASE_URL } from "../../config";
import { authStore } from "../../stores/authStore";
import { useNavigate } from "react-router-dom"; 

const MyRoadmap: FC = () => {
  const navigate = useNavigate()
  const {userId, token} = authStore()
  const [roadmaps, setRoadmaps] = useState<RoadmapSumType[]>([])

  // 로드맵 요약 불러오기
  useEffect(() => {
		async function fetchData() {
      axios({
        method: 'get',
        url: `${API_BASE_URL}/api/roadmap/list/${userId}`,
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((res) => {
        setRoadmaps(res.data)
      })
      .catch((err) => {
        console.error(err);
      });
		}
    fetchData();
	}, []);


  const [filterText, changeFilterText] = useState("");
  const filterdRoadmaps = roadmaps.filter(
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
      
      {/* 로드맵들 */}
      <div className="absolute top-32 z-0 w-7/12">
      {filterdRoadmaps.length === 0 ? <NoContent content={"로드맵"}/> : <>
        {filterdRoadmaps.map((roadmap) => (
          <Roadmap roadmap={roadmap} />
        ))}</>}
      </div>
      
      {/* 로드맵 추가 버튼 */}
      <button className="fixed z-20 bottom-10 right-10"
      onClick={() => navigate('/roadmap/create')}>
        
        <FaPlus color="skyblue" size={56}/>
      </button>
    </>
  );
};

export default MyRoadmap;
