// AsideBookmarkList.tsx 는 북마크리스트 정보를 출력하는 컴포넌트
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// components
import AsideBookmarkListKebabDropdown from "./ui/AsideBookmarkListKebabDropdown";
import ImageContainer from "./layout/ImageContainer";
import ItemDetailInfo from "./layout/ItemDetailInfo";
import LikesFavoritesCount from "./layout/LikesFavoritesCount(List)";
import Tags from "./layout/Tags";
import BookmarkListCommentsModal from "./layout/BookmarkListCommentsModal";

import KebabDropdown from "../common/KebabDropdown";
// stores
import darkModeStore from "../../stores/darkModeStore";

// apis
import { getBookmarkListComments } from "../../api/bookmarkListApi";

// types
import type { BookmarkListDetailType } from "../../types/BookmarkListType";

interface ItemProps {
  bookmarkList:BookmarkListDetailType;
}

const AsideBookmarkList : React.FC<ItemProps> = ({ bookmarkList }) => {

  const isDark = darkModeStore(state => state.isDark);
  const [ isCommentsOpen, setIsCommentsOpen ] = useState(false);
  const [ commentCount, setCommentCount ] = useState(0);

  useEffect(() => {
    const fetchCommentCount = async () => {
      try {
        const response = await getBookmarkListComments(bookmarkList.id);
        setCommentCount(response.data.length);
      } catch (error) {
        console.error("댓글 수를 가져오는 중 오류가 발생했습니다:", error);
      }
    };

    fetchCommentCount();
  }, [bookmarkList.id]);

  return (
    <div className={`${ isDark ? "bg-base-300" : "bg-sky-50" } rounded-3xl  p-8 flex flex-col items-center ` }>
      {/* 더보기 버튼 */}
      <div className="w-full flex flex-row justify-end">
      {<KebabDropdown whatMenu="리스트상세" id={bookmarkList.id} users={bookmarkList.users}/> }
      </div>
      {/* 북마크리스트 썸네일 */}
      <ImageContainer src={bookmarkList.image} whatContent="북마크리스트"/>
      {/* 북마크리스트 정보 */}
      <ItemDetailInfo {...bookmarkList} />
      {/* 태그 창 */}
      <Tags {...bookmarkList} />
      {/* 좋아요, 즐겨찾기 칸 */}
      <LikesFavoritesCount {...bookmarkList} />
      
      {/* 댓글 창 */}
      <div className="hidden md:block">
        <button 
          onClick={() => setIsCommentsOpen(true)} 
          className="btn btn-info text-base-100 w-full mt-4"
        >
          전체 댓글 보기 ({commentCount})
        </button>
      </div>
      <BookmarkListCommentsModal 
        id={bookmarkList.id} 
        isOpen={isCommentsOpen} 
        onClose={() => setIsCommentsOpen(false)} 
      />
    </div>
  );
};

export default AsideBookmarkList;