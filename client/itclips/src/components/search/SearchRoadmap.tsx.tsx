import { useState } from "react";

// components
import SearchRoadmapItem from "./SearchRoadmapItem";

// icons
import { FaList } from "react-icons/fa";
import { CiBoxList } from "react-icons/ci";
import { HiOutlineSquares2X2, HiMiniSquares2X2 } from "react-icons/hi2";

interface RoadmapItem {
  id: number;
  title: string;
  username: string;
  bookmarkCount: number;
  likeCount: number;
  createdAt: string;
  thumbnailUrl: string;
}

const SearchRoadmap = () => {

  const [ viewMode, setViewMode ] = useState<'grid' | 'list'>('list');
  const [ sortBy, setSortBy ] = useState<'views' | 'bookmarks' | 'likes'>('views');

  const tabList = () => {
    setViewMode("list");
  };

  const tabAlbum = () => {
    setViewMode("grid");
  };

  // 더미 데이터
  const data: RoadmapItem[] = [
    { id: 1, title: "로드맵_01", username: "고양양", bookmarkCount: 12, likeCount: 10, createdAt: "2024-01-01", thumbnailUrl: "" },
    { id: 2, title: "로드맵_02", username: "고양양", bookmarkCount: 12, likeCount: 10, createdAt: "2024-01-01", thumbnailUrl: "" },
    { id: 3, title: "로드맵_03", username: "고양양", bookmarkCount: 12, likeCount: 10, createdAt: "2024-01-01", thumbnailUrl: "" },
    { id: 4, title: "로드맵_04", username: "고양양", bookmarkCount: 12, likeCount: 10, createdAt: "2024-01-01", thumbnailUrl: "" },
    { id: 5, title: "로드맵_05", username: "고양양", bookmarkCount: 12, likeCount: 10, createdAt: "2024-01-01", thumbnailUrl: "" },
  ]

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
            className={`px-4 py-2 rounded-full ${sortBy === 'views' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setSortBy('views')}
          >
            조회수
          </button>
          <button 
            className={`px-4 py-2 rounded-full ${sortBy === 'bookmarks' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setSortBy('bookmarks')}
          >
            스크랩수
          </button>
          <button 
            className={`px-4 py-2 rounded-full ${sortBy === 'likes' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setSortBy('likes')}
          >
            좋아요수
          </button>
        </div>
      </div>
      {/* 검색 결과 */}
      <SearchRoadmapItem
        items={data}
        viewMode={viewMode}
      />
    </div>
  );
};

export default SearchRoadmap;