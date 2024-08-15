// AsideBookmarkList.tsx 는 북마크리스트 정보를 출력하는 컴포넌트
import React, { useState, useEffect } from "react";

// components
import ImageContainer from "./layout/ImageContainer";
import LikesFavoritesCount from "./layout/LikesFavoritesCount(List)";
import Tags from "./layout/Tags";
// stores
import darkModeStore from "../../stores/darkModeStore";

// apis
import { getBookmarkListComments } from "../../api/bookmarkListApi";

// types
import type { BookmarkListDetailType } from "../../types/BookmarkListType";

import { Link } from "react-router-dom";

interface ItemProps {
  data: BookmarkListDetailType;
}

const AsideMobileContent: React.FC<ItemProps> = ({ data }) => {
  const isDark = darkModeStore((state) => state.isDark);
  const [commentCount, setCommentCount] = useState(0);

  useEffect(() => {
    const fetchCommentCount = async () => {
      try {
        const response = await getBookmarkListComments(data.id);
        setCommentCount(response.data.length);
      } catch (error) {
        console.error("댓글 수를 가져오는 중 오류가 발생했습니다:", error);
      }
    };

    fetchCommentCount();
  }, [data.id]);

  return (
    <div
      className={`${
        isDark ? "bg-base-300" : "bg-sky-50"
      } rounded-3xl  p-8 flex flex-row justify-around items-center `}
    >
      {/* 북마크리스트 썸네일 */}
      <div className="flex flex-col">
        <ImageContainer src={data.image} whatContent="북마크리스트" />
        {data.users?.map((user: any) => (
          <div className="flex justify-start">
            <Link
              key={user.id}
              to={`/user/${user.id}`}
              className="text-xxs md:text-sm text-gray-500 mb-0.5 md:mb-2 me-0.5 md:me-1"
            >
              @{user.nickName}
            </Link>
          </div>
        ))}
      </div>
      {/* 북마크리스트 정보 */}
      <div className="pt-4 px-4" >
        <div className="text-center">
          <h2 className="text-base md:text-xl font-bold mb-0.5 md:mb-1 line-clamp-1 ">
            {data.title}
          </h2>

          <div className="px-1 md:px-4">
            <p className="text-start text-xxs md:text-sm mt-1 md:mt-4 mb-0.5 md:mb-1 line-clamp-1 ">
              {data.description}
            </p>
          </div>
        </div>
        {/* 태그 창 */}
        <Tags {...data} />
        {/* 좋아요, 즐겨찾기 칸 */}
        <LikesFavoritesCount {...data} />
      </div>
    </div>
  );
};

export default AsideMobileContent;
