import { useState, useEffect } from "react";
import axios from "axios";

// components
import SearchRoadmapItemsContainer from "./layout/SearchRoadmapItemsContainer";

// icons
import { FaList } from "react-icons/fa";
import { CiBoxList } from "react-icons/ci";
import { HiOutlineSquares2X2, HiMiniSquares2X2 } from "react-icons/hi2";
import { IoIosWarning } from "react-icons/io";

// apis
import { roadmapSearch } from "../../api/searchApi";

// stores
import { authStore } from "../../stores/authStore";

interface Step {
  id: number;
  listId: number;
  listTitle: string;
  order: string;
  check: boolean;
}

interface RoadmapItem {
  id: number;
  userId: number;
  userName: string;
  title: string;
  description: string;
  image: string;
  isPublic: number;
  createdAt: string;
  stepCnt: number;
  checkCnt: number;
  likeCnt: number;
  steps: Step[];
  isLiked: boolean;
}

interface SearchRoadmapProps {
  keyword: string;
}

const SearchRoadmap: React.FC<SearchRoadmapProps> = ({ keyword }) => {

  const userId = authStore(state => state.userId);

  const [ viewMode, setViewMode ] = useState<'grid' | 'list'>('list');
  const [ sortBy, setSortBy ] = useState<"조회수" | "스크랩수" | "좋아요수">("조회수");
  const [ roadmapItems, setRoadmapItems ] = useState<RoadmapItem[]>([]);
  const [ hasResults, setHasResults ] = useState<boolean>(true);

  const tabList = () => {
    setViewMode("list");
  };

  const tabAlbum = () => {
    setViewMode("grid");
  };

  useEffect(() => {
    const fetchRoadmap = async () => {
      try {
        const response = await roadmapSearch(userId, 1, sortBy, keyword);
        setRoadmapItems(response.data);
        setHasResults(true);
      } catch (error) {
        console.error("로드맵 검색 중 오류 발생 or 결과 없음:", error);
        if (axios.isAxiosError(error) && error.response?.status === 404) {
          setRoadmapItems([]);
          setHasResults(false);
        }
      }
    };

    fetchRoadmap();
  }, [userId, sortBy, keyword]);

  return (
    <div className="mt-4">
      {/* 리스트 & 액자형 탭 */}
      <div className='flex justify-end'> 
        <div role="tablist" className="tabs" >
            { viewMode === "grid" ? <><div onClick={tabList} role="tab" className="tab mx-3"><CiBoxList /></div><div onClick={tabAlbum} role="tab" className="tab tab-active"> <HiMiniSquares2X2 /> </div> </>:
            <> <div onClick={tabList} role="tab" className="tab tab-active mx-3"><FaList /></div> <div onClick={tabAlbum} role="tab" className="tab"> <HiOutlineSquares2X2 /></div></> }
        </div>
      </div>
      {/* 로드맵 검색 옵션 */}
      <div className="flex justify-between mb-4">
        <div className="space-x-2">
          <button 
            className={`px-4 py-2 rounded-full ${sortBy === "조회수" ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setSortBy("조회수")}
          >
            조회수
          </button>
          <button 
            className={`px-4 py-2 rounded-full ${sortBy === "스크랩수" ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setSortBy("스크랩수")}
          >
            스크랩수
          </button>
          <button 
            className={`px-4 py-2 rounded-full ${sortBy === "좋아요수" ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setSortBy("좋아요수")}
          >
            좋아요수
          </button>
        </div>
      </div>
      {/* 검색 결과 (검색 결과가 없으면 다른 창 출력) */}
      {hasResults ? (
        <SearchRoadmapItemsContainer
          items={roadmapItems}
          viewMode={viewMode}
        />
      ) : (
        <div className="flex flex-row items-center justify-center mt-10">
          <IoIosWarning color="skyblue" size={28} />
          <div className="ms-3 text-sm lg:text-xl font-bold py-8 text-center">
            검색 결과가 없습니다.
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchRoadmap;