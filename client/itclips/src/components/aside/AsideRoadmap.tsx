// AsideBookmarkList.tsx 는 북마크리스트 정보를 출력하는 컴포넌트
import React, { useState, useEffect } from "react";

// components
import AsideRoadmapKebabDropdown from "./ui/AsideRoadmapKebabDropdown";
// import KebabDropdown from "../common/KebabDropdown";
import ImageContainer from "./layout/ImageContainer";
import ItemDetailInfo from "./layout/ItemDetailInfo";
import LikesFavoritesCount from "./layout/LikesFavoritesCount(Roadmap)";
import Tags from "./layout/Tags";
import RoadmapCommentsModal from "./layout/RoadmapCommentsModal";
import KebabDropdown from "../common/KebabDropdown";
// stores
import darkModeStore from "../../stores/darkModeStore";

// types
import type { RoadmapDetailType } from "../../types/RoadmapType";

// apis
import { getRoadmapCommentsCount } from "../../api/roadmapApi";


interface Props {
  roadmap:RoadmapDetailType;
}


const AsideRoadmap :  React.FC<Props> = ({ roadmap }) => {

  const isDark = darkModeStore(state => state.isDark);
  const [ isCommentsOpen, setIsCommentsOpen ] = useState(false);
  const [ commentCount, setCommentCount ] = useState(0);

  useEffect(() => {
    const fetchCommentCount = async () => {
      try {
        const response = await getRoadmapCommentsCount(roadmap.id);
        setCommentCount(response.data);
      } catch (error) {
        console.error("댓글 수를 가져오는 중 오류가 발생했습니다:", error);
      }
    };

    fetchCommentCount();
  }, [roadmap.id]);

  const handleCommentCountChange = (newCount: number) => {
    setCommentCount(newCount);
  };

  return (
    <div className={`${isDark ? "bg-base-300" : "bg-sky-50"} rounded-3xl p-4 md:p-8`}>
      <div className="flex flex-col md:items-center">
        {/* 더보기 버튼 - 모바일에서 오른쪽 상단에 위치 */}
        <div className="self-end md:w-full md:flex md:justify-end md:mb-4">
          <KebabDropdown whatMenu="로드맵" id={roadmap.id} contentUserId={roadmap.userId} />
        </div>

        <div className="flex flex-row md:flex-col md:items-center">
          {/* 이미지와 좋아요/즐겨찾기 - 모바일에서 나란히 배치 */}
          <div className="flex flex-row md:flex-col md:items-center w-full md:mb-4">
            {/* 북마크리스트 썸네일 */}
            <div className="mr-4 md:mr-0 md:mb-4">
              <ImageContainer src={roadmap.image} whatContent="로드맵" />
            </div>

            {/* 좋아요, 즐겨찾기 칸 */}
            <div className="md:w-full">
              <LikesFavoritesCount {...roadmap} />
            </div>
          </div>

          {/* 북마크리스트 정보 */}
          <div className="w-full mt-4 md:mt-0">
            <ItemDetailInfo 
              title={roadmap.title} 
              description={roadmap.description} 
              userName={roadmap.userName} 
              userId={roadmap.userId}
            />
          </div>
        </div>

        {/* 댓글 버튼 */}
        <div className="hidden md:block mt-4">
          <button 
            onClick={() => setIsCommentsOpen(true)} 
            className="btn btn-info w-full text-base-100 text-sm"
          >
            전체 댓글 보기 ({commentCount})
          </button>
        </div>
      </div>

      {/* 댓글 모달 */}
      <RoadmapCommentsModal
        id={roadmap.id}
        isOpen={isCommentsOpen}
        onClose={() => setIsCommentsOpen(false)}
        onCommentCountChange={handleCommentCountChange}
      />
    </div>
  );
};

export default AsideRoadmap;
