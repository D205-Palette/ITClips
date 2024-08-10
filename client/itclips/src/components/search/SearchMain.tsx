import { useState, useEffect } from "react";

// components
import RecommendedItemsContainer from "./layout/RecommendedItemsContainer";

// icons
import { FaList } from "react-icons/fa";
import { CiBoxList } from "react-icons/ci";
import { HiOutlineSquares2X2, HiMiniSquares2X2 } from "react-icons/hi2";
import { IoIosWarning } from "react-icons/io";

// apis
import { getRecommendedBookmarks } from "../../api/searchApi";

// stores
import { authStore } from "../../stores/authStore";

interface RecommendedItem {
  id: number;
  title: string;
  description: string;
  bookmarkCount: number;
  createdAt: string;
  likeCount: number;
  image: string;
  isLiked: boolean;
  tags: { title: string }[];
  users: { id: number; nickName: string }[];
}

const SearchMain = () => {

  const userId = authStore(state => state.userId);
  const [ viewMode, setViewMode ] = useState<'grid' | 'list'>('list');
  const [ recommendedItems, setRecommendedItems ] = useState<RecommendedItem[]>([]);
  const [ error, setError ] = useState<string | null>(null);
  
  // 추천 목록 조회
  useEffect(() => {
    const fetchRecommendedItems = async () => {
      setError(null);
      try {
        const response = await getRecommendedBookmarks(userId);
        setRecommendedItems(response.data);
      } catch (err) {
        setError("관심사 태그가 없거나 맞는 추천 아이템이 없습니다.");
        console.error("Error fetching recommended items:", err);
      }
    };

    fetchRecommendedItems();
  }, [userId]);

  const tabList = () => {
    setViewMode("list");
  };

  const tabAlbum = () => {
    setViewMode("grid");
  };

  return (
    <div className="mt-4">
      {/* 사용자 맞춤 추천 제목과 탭 */}
      <div className='flex items-center justify-between mb-4'>
        <div className="flex items-center flex-grow">
          <p className="text-lg font-semibold mr-4">사용자 맞춤 추천</p>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>
        <div role="tablist" className="tabs">
          {viewMode === "grid" ? (
            <>
              <div onClick={tabList} role="tab" className="tab mx-3"><CiBoxList /></div>
              <div onClick={tabAlbum} role="tab" className="tab tab-active"><HiMiniSquares2X2 /></div>
            </>
          ) : (
            <>
              <div onClick={tabList} role="tab" className="tab tab-active mx-3"><FaList /></div>
              <div onClick={tabAlbum} role="tab" className="tab"><HiOutlineSquares2X2 /></div>
            </>
          )}
        </div>
      </div>
      {/* 추천 결과 */}
      {error ? (
        <div className="flex flex-row items-center justify-center mt-10">
          <IoIosWarning color="skyblue" size={28} />
          <div className="ms-3 text-sm lg:text-xl font-bold py-8 text-center">
            관심사 태그가 없거나 맞는 추천 아이템이 없습니다.
          </div>
        </div>
      ) : (
        <RecommendedItemsContainer items={recommendedItems} viewMode={viewMode} />
      )}
    </div>
  );
};

export default SearchMain;