import { useState } from "react";

// components
import SearchBookmarkListItemsContainer from "./layout/SearchBookmarkListItemsContainer";

// icons
import { FaList } from "react-icons/fa";
import { CiBoxList } from "react-icons/ci";
import { HiOutlineSquares2X2, HiMiniSquares2X2 } from "react-icons/hi2";

interface BookmarkListItem {
  id: number;
  title: string;
  username: string;
  bookmarks: number;
  likes: number;
  createdAt: string;
  thumbnailUrl: string;
}

const SearchBookmarkList = () => {

  const [ viewMode, setViewMode ] = useState<'grid' | 'list'>('list');
  const [ sortBy, setSortBy ] = useState<'views' | 'bookmarks' | 'likes'>('views');

  const tabList = () => {
    setViewMode("list");
  };

  const tabAlbum = () => {
    setViewMode("grid");
  };

  // 더미 데이터
  const data: BookmarkListItem[] = [
    { id: 1, title: "북마크 리스트_01", username: "고양양", bookmarks: 12, likes: 10, createdAt: "2024-01-01", thumbnailUrl: "" },
    { id: 2, title: "북마크 리스트_02", username: "고양양", bookmarks: 12, likes: 10, createdAt: "2024-01-01", thumbnailUrl: "" },
    { id: 3, title: "북마크 리스트_03", username: "고양양", bookmarks: 12, likes: 10, createdAt: "2024-01-01", thumbnailUrl: "" },
    { id: 4, title: "북마크 리스트_04", username: "고양양", bookmarks: 12, likes: 10, createdAt: "2024-01-01", thumbnailUrl: "" },
    { id: 5, title: "북마크 리스트_05", username: "고양양", bookmarks: 12, likes: 10, createdAt: "2024-01-01", thumbnailUrl: "" },
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
      {/* 북마크리스트 검색 결과 */}
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
      <SearchBookmarkListItemsContainer
        items={data}
        viewMode={viewMode}
      />
    </div>
  );
};

export default SearchBookmarkList;