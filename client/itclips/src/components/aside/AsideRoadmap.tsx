// AsideBookmarkList.tsx 는 북마크리스트 정보를 출력하는 컴포넌트

// components
import AsideRoadmapKebabDropdown from "./ui/AsideRoadmapKebabDropdown";
import ImageContainer from "./layout/ImageContainer";
import ItemDetailInfo from "./layout/ItemDetailInfo";
import LikesFavoritesCount from "./layout/LikesFavoritesCount(Roadmap)";
import Tags from "./layout/Tags";
import CommentsContainer from "./layout/CommentsContainer";

// stores
import darkModeStore from "../../stores/darkModeStore";
import { asideStore } from "../../stores/asideStore";

import type { RoadmapDetailType } from "../../types/RoadmapType";


interface Props {
  roadmap:RoadmapDetailType;
}


const AsideRoadmap :  React.FC<Props> = ({roadmap}) => {

  const isDark = darkModeStore(state => state.isDark);
  const isMessageOpen = asideStore(state => state.isMessageOpen);

  return (
    <div className={`${ isDark ? "bg-base-300" : "bg-sky-100" } rounded-3xl w-80 p-8 flex flex-col items-center`}>
      {/* 더보기 버튼 */}
      { !isMessageOpen && <AsideRoadmapKebabDropdown isRoadmap={true} id={roadmap.id}/> }
      {/* 북마크리스트 썸네일 */}
      <ImageContainer src={roadmap.image} whatContent="로드맵" />
      {/* 북마크리스트 정보 */}
      <ItemDetailInfo title={roadmap.title} description={roadmap.description} />
      {/* 좋아요, 즐겨찾기 칸 */}
      <LikesFavoritesCount {...roadmap} />
      {/* 태그 창 */}
      {/* <Tags {...roadmapInfo} /> */}
      {/* 댓글 창 */}
      <CommentsContainer id={roadmap.id} />
    </div>
  );
};

export default AsideRoadmap;
