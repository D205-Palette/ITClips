import { useState, useEffect } from "react";
import axios from "axios";

// components
import SearchBookmarkListItemsContainer from "./layout/SearchBookmarkListItemsContainer";

// icons
import { FaList } from "react-icons/fa";
import { CiBoxList } from "react-icons/ci";
import { HiOutlineSquares2X2, HiMiniSquares2X2 } from "react-icons/hi2";
import { IoIosWarning } from "react-icons/io";

// apis
import { bookmarkSearch } from "../../api/searchApi";

// stores
import { authStore } from "../../stores/authStore";
import { searchStore } from "../../stores/searchStore";

interface SearchBookmarkListProps {
  keyword: string;
}

const SearchBookmarkList: React.FC<SearchBookmarkListProps> = ({ keyword }) => {

  const userId = authStore(state => state.userId);
  const { bookmarkListItems, setBookmarkListItems } = searchStore();

  const [ viewMode, setViewMode ] = useState<'grid' | 'list'>('list');
  const [ sortBy, setSortBy ] = useState<"hit" | "scrap" | "like">("hit");
  const [ hasResults, setHasResults ] = useState<boolean>(true);

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
        setHasResults(true);
      } catch (error) {
        console.error("북마크 리스트 검색 중 오류 발생 or 결과 없음:", error);
        if (axios.isAxiosError(error) && error.response?.status === 404) {
          setBookmarkListItems([]);
          setHasResults(false);
        }
      }
    };

    fetchBookmarkList();
  }, [userId, sortBy, keyword, setBookmarkListItems]);

  return (
    <div className="mt-2 md:mt-4">
      {/* 리스트 & 액자형 탭 */}
      <div className='flex justify-end'> 
        <div role="tablist" className="tabs hidden md:block">
            { viewMode === "grid" ? <><div onClick={tabList} role="tab" className="tab mx-2 md:mx-3"><CiBoxList className="w-4 h-4 md:w-5 md:h-5" /></div><div onClick={tabAlbum} role="tab" className="tab tab-active"> <HiMiniSquares2X2 className="w-4 h-4 md:w-5 md:h-5" /> </div> </>:
            <> <div onClick={tabList} role="tab" className="tab tab-active mx-2 md:mx-3"><FaList className="w-4 h-4 md:w-5 md:h-5" /></div> <div onClick={tabAlbum} role="tab" className="tab"> <HiOutlineSquares2X2 className="w-4 h-4 md:w-5 md:h-5" /></div></> }
        </div>
      </div>
      {/* 북마크리스트 검색 결과 */}
      <div className="flex justify-between mb-2 md:mb-4">
        <div className="space-x-1 md:space-x-2">
          <button 
            className={`px-2 md:px-4 py-1 md:py-2 rounded-full text-xs md:text-sm ${sortBy === "hit" ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setSortBy("hit")}
          >
            조회수
          </button>
          <button 
            className={`px-2 md:px-4 py-1 md:py-2 rounded-full text-xs md:text-sm ${sortBy === "scrap" ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setSortBy("scrap")}
          >
            스크랩수
          </button>
          <button 
            className={`px-2 md:px-4 py-1 md:py-2 rounded-full text-xs md:text-sm ${sortBy === "like" ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setSortBy("like")}
          >
            좋아요수
          </button>
        </div>
      </div>
      {/* 검색 결과 (검색 결과가 없으면 다른 창 출력) */}
      {hasResults ? (
        <SearchBookmarkListItemsContainer
          items={bookmarkListItems}
          viewMode={viewMode}
        />
      ) : (
        <div className="flex flex-row items-center justify-center mt-5 md:mt-10">
          <IoIosWarning color="skyblue" className="w-5 h-5 md:w-7 md:h-7" />
          <div className="ms-2 md:ms-3 text-xs md:text-sm lg:text-xl font-bold py-4 md:py-8 text-center">
            검색 결과가 없습니다.
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBookmarkList;