import { useState, useEffect } from "react";
import axios from "axios";

// components
import SearchTagItemsContainer from "./layout/SearchTagItemsContainer";

// icons
import { FaList } from "react-icons/fa";
import { CiBoxList } from "react-icons/ci";
import { HiOutlineSquares2X2, HiMiniSquares2X2 } from "react-icons/hi2";
import { IoIosWarning } from "react-icons/io";

// apis
import { tagSearch } from "../../api/searchApi";

// stores
import { authStore } from "../../stores/authStore";
import { searchStore } from "../../stores/searchStore";

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

const SearchTag: React.FC<SearchBookmarkListProps> = ({ keyword }) => {

  const userId = authStore(state => state.userId);
  const { bookmarkListItems, setBookmarkListItems } = searchStore();

  const [ viewMode, setViewMode ] = useState<'grid' | 'list'>('list');
  const [ hasResults, setHasResults ] = useState<boolean>(true);

  const tabList = () => {
    setViewMode("list");
  };

  const tabAlbum = () => {
    setViewMode("grid");
  };

  // 태그로 검색 결과 조회 로직
  useEffect(() => {
    const fetchRoadmap = async () => {
      try {
        const tags = keyword
          .split('#')
          .filter(tag => tag.trim() !== '')
          .map(tag => ({ title: tag.trim() }));

        const response = await tagSearch(userId, 1, tags);
        setBookmarkListItems(response.data);
        setHasResults(true);
      } catch (error) {
        console.error("북마크 리스트 태그 검색 중 오류 발생 or 결과 없음:", error);
        if (axios.isAxiosError(error) && error.response?.status === 404) {
          setBookmarkListItems([]);
          setHasResults(false);
        }
      }
    };

    fetchRoadmap();
  }, [userId, keyword, setBookmarkListItems]);

  return (
    <div className="mt-4">
      {/* 리스트 & 액자형 탭 */}
      <div className='flex justify-end'> 
        <div role="tablist" className="tabs" >
            { viewMode === "grid" ? <><div onClick={tabList} role="tab" className="tab mx-3"><CiBoxList /></div><div onClick={tabAlbum} role="tab" className="tab tab-active"> <HiMiniSquares2X2 /> </div> </>:
            <> <div onClick={tabList} role="tab" className="tab tab-active mx-3"><FaList /></div> <div onClick={tabAlbum} role="tab" className="tab"> <HiOutlineSquares2X2 /></div></> }
        </div>
      </div>
      {/* 검색 결과 (검색 결과가 없으면 다른 창 출력) */}
      {hasResults ? (
        <SearchTagItemsContainer
          items={bookmarkListItems}
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

export default SearchTag;