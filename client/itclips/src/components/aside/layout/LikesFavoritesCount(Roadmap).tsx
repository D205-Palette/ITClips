// LikesFavoritesCount.tsx 는 AsideBookmarkList.tsx 에서 좋아요, 즐겨찾기 갯수를 출력하는 컴포넌트

// icons
import { FaRegHeart,FaHeart, FaRegStar,FaStar } from "react-icons/fa";
import type { RoadmapDetailType } from "../../../types/RoadmapType";
import { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../../config";
import { authStore } from "../../../stores/authStore";

const LikesFavoritesCount = (data: RoadmapDetailType) => {

  const {userId, token} = authStore()


  const [isLike, setIsLike] = useState(data.isLiked)
  const [likeCount, changeLikeCount] = useState(data.likeCnt)

//   const [isScraped, setIsScraped] = useState(data.isScraped)
  const [scrapCount, changeScrapCount] = useState(data.scrapCnt)

  const clickHeart = (): void => {
    if (isLike) {
      axios.delete(`${API_BASE_URL}/api/roadmap/like/${data.id}/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      changeLikeCount(likeCount - 1);
    } else {
      axios.post(`${API_BASE_URL}/api/roadmap/like/${data.id}/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      changeLikeCount(likeCount + 1);
    }
    setIsLike(!isLike);
  };


//   const clickStar = (): void => {
//     if (isScraped) {
//       axios.delete(`${API_BASE_URL}/api/list/scrap/${userId}/${data.id}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       changeScrapCount(scrapCount - 1);
//     } else {
//       axios.post(`${API_BASE_URL}/api/list/scrap/${userId}/${data.id}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       changeScrapCount(scrapCount + 1);
//     }
//     setIsScraped(!isScraped);
//   };



return (
  <div className="flex justify-center items-center w-full mb-4">
    <div className="flex items-center">
      <button
        className="flex items-center justify-center mr-2 hover:cursor-pointer"
        onClick={clickHeart}
      >
        {isLike ? (
          <FaHeart color="red" size={12} />
        ) : (
          <FaRegHeart size={12} />
        )}
      </button>
      <span className={isLike ? "" : "text-slate-400"}>{likeCount}</span>
    </div>
  </div>
);
};

export default LikesFavoritesCount;