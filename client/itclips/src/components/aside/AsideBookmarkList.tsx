// AsideBookmarkList.tsx 는 북마크리스트 정보를 출력하는 컴포넌트
import { useParams } from "react-router-dom";

// components
import AsideBookmarkListKebabDropdown from "./ui/AsideBookmarkListKebabDropdown";
import ImageContainer from "./layout/ImageContainer";
import ItemDetailInfo from "./layout/ItemDetailInfo";
import LikesFavoritesCount from "./layout/LikesFavoritesCount";
import Tags from "./layout/Tags";
import CommentsContainer from "./layout/CommentsContainer";

// stores
import darkModeStore from "../../stores/darkModeStore";
import { asideStore } from "../../stores/asideStore";

import type { BookmarkListDetailType } from "../../types/BookmarkListType";

// apis
import { getBookmarkListComments } from "../../api/bookmarkListApi";

interface ItemProps {
  bookmarkList:BookmarkListDetailType;
}

const AsideBookmarkList : React.FC<ItemProps> = ({bookmarkList}) => {

  const isDark = darkModeStore(state => state.isDark);
  const isMessageOpen = asideStore(state => state.isMessageOpen);

  return (
    <div className={`${ isDark ? "bg-base-300" : "bg-sky-100" } rounded-3xl w-80 p-8 flex flex-col items-center`}>
      {/* 더보기 버튼 */}
      { !isMessageOpen && <AsideBookmarkListKebabDropdown isRoadmap={false} id={bookmarkList.id}/> }
      {/* 북마크리스트 썸네일 */}
      <ImageContainer />
      {/* 북마크리스트 정보 */}
      <ItemDetailInfo {...bookmarkList} />
      {/* 좋아요, 즐겨찾기 칸 */}
      <LikesFavoritesCount {...bookmarkList} />
      {/* 태그 창 */}
      <Tags {...bookmarkList} />
      {/* 댓글 창 */}
      <CommentsContainer id={bookmarkList.id} />
    </div>
  );
};

export default AsideBookmarkList;