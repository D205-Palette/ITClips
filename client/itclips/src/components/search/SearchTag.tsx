import { useState } from "react";

// components
import SearchTagItemsContainer from "./layout/SearchTagItemsContainer";

// icons
import { FaList } from "react-icons/fa";
import { CiBoxList } from "react-icons/ci";
import { HiOutlineSquares2X2, HiMiniSquares2X2 } from "react-icons/hi2";

interface Tag {
  id: number;
  title: string;
  username: string;
  bookmarks: number;
  likes: number;
  createdAt: string;
  thumbnailUrl: string;
}

const SearchTag = () => {

  const [ viewMode, setViewMode ] = useState<'grid' | 'list'>('list');

  const tabList = () => {
    setViewMode("list");
  };

  const tabAlbum = () => {
    setViewMode("grid");
  };

  // 더미 데이터
  const data: Tag[] = [
    { id: 1, title: "생성된 리스트_01", username: "고양양", bookmarks: 12, likes: 10, createdAt: "2024-01-01", thumbnailUrl: "" },
    { id: 2, title: "생성된 리스트_02", username: "고양양", bookmarks: 12, likes: 10, createdAt: "2024-01-01", thumbnailUrl: "" },
    { id: 3, title: "고양양의 플레이 리스트", username: "고양양", bookmarks: 12, likes: 10, createdAt: "2024-01-01", thumbnailUrl: "" },
    { id: 4, title: "고양친구의 플레이 리스트", username: "고양양", bookmarks: 12, likes: 10, createdAt: "2024-01-01", thumbnailUrl: "" },
    { id: 5, title: "생성된 리스트_03", username: "고양양", bookmarks: 12, likes: 10, createdAt: "2024-01-01", thumbnailUrl: "" },
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
      {/* 검색 결과 */}
      <SearchTagItemsContainer
        items={data}
        viewMode={viewMode}
      />
    </div>
  );
};

export default SearchTag;