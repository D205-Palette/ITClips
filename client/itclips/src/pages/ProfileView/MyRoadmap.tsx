import SearchBar from "../../components/main/MainSearchBar";
import { FC, useState, useEffect } from "react";
import Roadmap from "../../components/main/Roadmap";
import MainTab from "../../components/main/MainTab";
import type { RoadmapSumType } from "../../types/RoadmapType";
import NoContent from "./NoContent";
import { FaPlus } from "react-icons/fa6";
import axios from "axios";
import { API_BASE_URL } from "../../config";
import { authStore } from "../../stores/authStore";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom"; 
import mainStore from "../../stores/mainStore";

const MyRoadmap = () => {
  const navigate = useNavigate()
  const {userId, token} = authStore()
  const [roadmaps, setRoadmaps] = useState<RoadmapSumType[]>([])
  const params = useParams()
  const {isRoadmapChange, setIsRoadmapChange} = mainStore()
  const [filterdRoadmaps, setFilterdRoadmaps] = useState<RoadmapSumType[]>([])
  const [filterText, changeFilterText] = useState("");
  const [canEdit, setCanEdit] = useState(false) 
  const [noContent, setNoContent] = useState(<div className="w-full flex flex-row justify-center mt-6"><span className="loading loading-spinner loading-lg text-sky-500"></span></div>)
  // 변경사항 있을때마다 로드맵 요약 불러오기
  useEffect(() => {
    async function fetchData() {
      axios({
        method: "get",
        url: `${API_BASE_URL}/api/roadmap/list/${params.userId}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          viewId: userId,
        },
      })
      .then((res) => {
        setRoadmaps(res.data)
        setFilterdRoadmaps(res.data.filter((roadmap:any) =>roadmap.title.includes(filterText)))
        setIsRoadmapChange(false)        
        if(String(userId)===params.userId){
          setCanEdit(true)}
          setNoContent( <NoContent content={"로드맵"}/> )
      })
      .catch((err) => {
        console.error(err);
      });
		}
    fetchData();
	}, [isRoadmapChange]);

  useEffect(() => {
    setFilterdRoadmaps(roadmaps.filter((roadmap) =>roadmap.title.includes(filterText)))
  }, [filterText]);


  return (
    <>
      <div className="sticky top-16 z-20 w-full bg-base-100">
        <MainTab userId={Number(params.userId)}/>
        <SearchBar
          whatSearch={"로드맵"}
          filterText={filterText}
          changeFilterText={changeFilterText}
        />
      </div>

      {/* 로드맵들 */}
      <div className="">
      {filterdRoadmaps.length === 0 ? noContent : <>
        {filterdRoadmaps.map((roadmap) => (
          <Roadmap roadmap={roadmap} canEdit={canEdit}/>
        ))}</>}
      </div>

      {/* 로드맵 추가 버튼 */}
      {canEdit? <button className="fixed bottom-24 right-16 z-20  justify-end w-full hidden md:flex"
      onClick={() => navigate('/roadmap/create')}>
        
        <FaPlus color="skyblue" size={56}/>
      </button>: <></> }
      

    </>
  );
};

export default MyRoadmap;
