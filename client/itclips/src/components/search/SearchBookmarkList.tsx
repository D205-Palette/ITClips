import { useState, useEffect } from "react";

// components
import SearchBookmarkListItemsContainer from "./layout/SearchBookmarkListItemsContainer";

// icons
import { FaList } from "react-icons/fa";
import { CiBoxList } from "react-icons/ci";
import { HiOutlineSquares2X2, HiMiniSquares2X2 } from "react-icons/hi2";

// apis
import { bookmarkSearch } from "../../api/searchApi";

// stores
import { authStore } from "../../stores/authStore";

interface Tag {
  title: string;
}

interface User {
  id: number;
  nickName: string;
}

interface BookmarkListItem {
  id: number;
  title: string;
  description: string;
  bookmarkCount: number;
  likeCount: number;
  image: string;
  isLiked: boolean;
  tags: Tag[];
  users: User[];
}

interface SearchBookmarkListProps {
  keyword: string;
}

const SearchBookmarkList: React.FC<SearchBookmarkListProps> = ({ keyword }) => {

  const userId = authStore(state => state.userId)

  const [ viewMode, setViewMode ] = useState<'grid' | 'list'>('list');
  const [ sortBy, setSortBy ] = useState<"조회수" | "스크랩수" | "좋아요수">("조회수");
  const [bookmarkListItems, setBookmarkListItems] = useState<BookmarkListItem[]>([]);

  const tabList = () => {
    setViewMode("list");
  };

  const tabAlbum = () => {
    setViewMode("grid");
  };

  useEffect(() => {
    const fetchBookmarkList = async () => {
      try {
        const response = await bookmarkSearch(userId, 1, sortBy, keyword);
        setBookmarkListItems(response.data);
      } catch (error) {
        console.error("북마크 리스트 검색 중 오류 발생:", error);
      }
    };

    fetchBookmarkList();
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
      {/* 북마크리스트 검색 결과 */}
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
      {/* 검색 결과 */}
      <SearchBookmarkListItemsContainer
        items={bookmarkListItems}
        viewMode={viewMode}
      />
    </div>
  );
};

export default SearchBookmarkList;