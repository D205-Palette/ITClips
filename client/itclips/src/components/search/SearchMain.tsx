// SearchMain.tsx 는 검색창 들어가면 제일 처음 나오는 컴포넌트

import { useState } from "react";

// components
import RecommandedItems from "./layout/RecommandedItems";

// icons
import { FaList } from "react-icons/fa";
import { CiBoxList } from "react-icons/ci";
import { HiOutlineSquares2X2, HiMiniSquares2X2 } from "react-icons/hi2";

interface RecommandedItem {
  id: number;
  title: string;
  username: string;
  imageUrl: string;
  bookmarks: number;
  likes: number;
  createdAt: string;
}

const SearchMain = () => {

  const [ viewMode, setViewMode ] = useState<'grid' | 'list'>('list');

  const tabList = () => {
    setViewMode("list");
  };

  const tabAlbum = () => {
    setViewMode("grid");
  };

  // 더미 데이터
  const data: RecommandedItem[] = [
    { id: 1, title: "생성된 리스트_01", username: "고양양", imageUrl: "", bookmarks: 20, likes: 10, createdAt: "2020-01-01" },
    { id: 2, title: "생성된 리스트_02", username: "고양양", imageUrl: "", bookmarks: 30, likes: 20, createdAt: "2020-01-01" },
    { id: 3, title: "생성된 리스트_03", username: "고양양", imageUrl: "", bookmarks: 10, likes: 30, createdAt: "2020-01-01" },
    { id: 4, title: "생성된 리스트_04", username: "고양양", imageUrl: "", bookmarks: 5, likes: 40, createdAt: "2020-01-01" },
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
      <div className="flex">
        <p>사용자 맞춤 추천</p>
        {/* 밑줄 */}
        <hr />
      </div>
      {/* 추천 결과 */}
      <RecommandedItems items={data} viewMode={viewMode} />
    </div>
  );
};

export default SearchMain;