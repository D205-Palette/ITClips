// AsideBookmarkList.tsx 는 북마크리스트 정보를 출력하는 컴포넌트
import React, { useState, useEffect } from "react";

// components
import ImageContainer from "./layout/ImageContainer";
import LikesFavoritesCount from "./layout/LikesFavoritesCount(Roadmap)";

// stores
import darkModeStore from "../../stores/darkModeStore";

// types
import type { RoadmapDetailType } from "../../types/RoadmapType";

// apis
import { getRoadmapCommentsCount } from "../../api/roadmapApi";

import { Link } from "react-router-dom";
interface Props {
  data: RoadmapDetailType;
}

const AsideRoadmap: React.FC<Props> = ({ data }) => {
  const isDark = darkModeStore((state) => state.isDark);
  const [commentCount, setCommentCount] = useState(0);

  useEffect(() => {
    const fetchCommentCount = async () => {
      try {
        const response = await getRoadmapCommentsCount(data.id);
        setCommentCount(response.data);
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
      } rounded-3xl p-4 md:p-8 flex flex-row items-center justify-around`}
    >
      <div className="flex flex-col">
        {/* 북마크리스트 썸네일 */}

        <ImageContainer src={data.image} whatContent="로드맵" id={data.id}/>

        <Link
          to={`/user/${data.userId}`}
          className="text-xxs md:text-sm text-gray-500 mb-0.5 md:mb-2"
        >
          @{data.userName}
        </Link>
      </div>

      {/* 북마크리스트 정보 */}
      <div className="pt-4 px-4">
        <div className="text-center">
          <h2 className="text-base md:text-xl font-bold mb-0.5 md:mb-1 line-clamp-1">
            {data.title}
          </h2>

          <div className="px-1 md:px-4">
            <p className="text-start text-xxs md:text-sm mt-1 md:mt-4 mb-0.5 md:mb-1 line-clamp-2 ">
              {data.description}
            </p>
          </div>
        </div>
        {/* 좋아요, 즐겨찾기 칸 */}
        <div className="md:w-full mt-2">
          <LikesFavoritesCount {...data} />
        </div>
      </div>
    </div>
  );
};

export default AsideRoadmap;
