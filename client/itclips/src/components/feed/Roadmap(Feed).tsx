import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import KebabDropdown from "./KebabDropdown(Feed)";
import darkModeStore from "../../stores/darkModeStore";
import type { RoadmapSumType } from "../../types/RoadmapType";
import noImg from "../../assets/images/noImg.gif";
import axios from "axios";
import { API_BASE_URL } from "../../config";
import { authStore } from "../../stores/authStore";

interface Props {
  roadmap: RoadmapSumType;
}

const RoadMap: FC<Props> = ({ roadmap }) => {
  const { token, userId } = authStore();
  const [isLike, setIsLike] = useState(roadmap.isLiked);
  const [likeCount, changeLikeCount] = useState(roadmap.likeCnt);

  // 좋아요
  const clickHeart = (
    event: React.MouseEvent<HTMLButtonElement | HTMLDivElement>
  ): void => {
    event.stopPropagation();

    if (isLike) {
      axios.delete(`${API_BASE_URL}/api/roadmap/like/${roadmap.id}/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      changeLikeCount(likeCount - 1);
    } else {
      {
        axios.post(`${API_BASE_URL}/api/roadmap/like/${roadmap.id}/${userId}`,
          {},
          {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
      changeLikeCount(likeCount + 1);
    }
    setIsLike(!isLike);
  };

  const isDark = darkModeStore((state) => state.isDark);
  const navigate = useNavigate();

  const handleCardClick = (): void => {
    navigate(`/roadmap/${roadmap.id}`);
  };

  const handleDropdownClick = (
    event: React.MouseEvent<HTMLButtonElement | HTMLDivElement>
  ) => {
    event.stopPropagation();
  };

  // 닉네임 클릭 시 유저 페이지로 이동
  const handleNicknameClick = (userId: number) => {
    return (event: React.MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();
      navigate(`/user/${userId}`);
    };
  };

  const getRelativeTime = (createdAt: string) => {
    const now = new Date();
    const createdDate = new Date(createdAt);
    createdDate.setHours(createdDate.getHours() + 9);
    const diffInMs = now.getTime() - createdDate.getTime();
    const diffInMinutes = diffInMs / (1000 * 60);
    const diffInHours = diffInMs / (1000 * 60 * 60);
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

    if (diffInMinutes < 1) {
      return "방금 전";
    } else if (diffInMinutes < 60) {
      return `${Math.floor(diffInMinutes)}분 전`;
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}시간 전`;
    } else {
      return `${Math.floor(diffInDays)}일 전`;
    }
  };

  return (
    <div
      className={`border card bg-base-100 w-full hover:cursor-pointer ${
        isDark ? "hover:bg-slate-700" : "hover:bg-slate-100"
      }`}
      onClick={handleCardClick}
    >
      <div
        id="cardHaeder"
        className="flex justify-between items-center mx-3"
        onClick={handleDropdownClick}
      >
        {/* 카드 상단 : 유저정보,  */}
        <div
          id="userInfo"
          className="m-3 flex items-center gap-2 hover:bg-base-100 rounded-xl p-2"
          onClick={handleNicknameClick(roadmap.userId)}
        >
          <div className="w-10 h-10 border rounded-full overflow-hidden">
            <img
              src={roadmap.userImage === "default" ? noImg : roadmap.userImage}
              className="w-full h-full object-cover"
              alt="로드맵유저이미지"
            />
          </div>
          <h2>{roadmap.userName}</h2>
          <div className="badge badge-error text-slate-100">
            {getRelativeTime(roadmap.createdAt)}
          </div>
        </div>

        <button className="hidden md:inline" onClick={handleDropdownClick}>
          <KebabDropdown whatMenu="로드맵" id={roadmap.id} />
        </button>
      </div>

      <figure className="border rounded-xl mx-5 overflow-hidden h-64 bg-sky-100">
        <img
          className="w-full h-full object-contain "
          src={roadmap.image === "default" ? noImg : roadmap.image}
          alt="RoadmapImg"
        />
      </figure>

      <div className="card-body">
        <h2 className="card-title">{roadmap.title}</h2>
        <p className="text-sm md:text-base line-clamp-3">
          {" "}
          {roadmap.description}
        </p>

        <div className="card-actions justify-end flex items-center relative mt-2">
          <button onClick={clickHeart} className="btn btn-ghost z-0 ">
            {isLike ? <FaHeart color="red" /> : <FaRegHeart />}
            {likeCount}{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoadMap;
