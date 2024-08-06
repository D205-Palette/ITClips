import { useState, useEffect } from "react";
import axios from "axios";

// components
import SearchUserItemsContainer from "./layout/SearchUserItemsContainer";

// apis
import { userSearch } from "../../api/searchApi";

// stores
import { authStore } from "../../stores/authStore";

// icons
import { IoIosWarning } from "react-icons/io";

interface User {
  id: number;
  email: string;
  nickname: string;
  birth: string;
  job: string;
  gender: boolean;
  bio: string;
  image: string;
  bookmarkListCount: number;
  roadmapCount: number;
  followerCount: number;
  followingCount: number;
  following: boolean;
  followers: boolean;
}

interface SearchUserProps {
  keyword: string;
}

const SearchUser: React.FC<SearchUserProps> = ({ keyword }) => {

  const userId = authStore(state => state.userId);

  const [ userItems, setUserItems ] = useState<User[]>([]);
  const [ hasResults, setHasResults ] = useState<boolean>(true);

  // 사용자 검색
  useEffect(() => {
    const fetchBookmarkList = async () => {
      try {
        const response = await userSearch(userId, 1, keyword);
        setUserItems(response.data);
        setHasResults(true);
      } catch (error) {
        console.error("북마크 리스트 검색 중 오류 발생 or 결과 없음:", error);
        if (axios.isAxiosError(error) && error.response?.status === 404) {
          setUserItems([]);
          setHasResults(false);
        }
      }
    };

    fetchBookmarkList();
  }, [userId, keyword]);

  return (
    <div className="container mx-auto p-4">
      {/* 검색 결과 (검색 결과가 없으면 다른 창 출력) */}
      {hasResults ? (
        <SearchUserItemsContainer
          items={userItems}
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

export default SearchUser;