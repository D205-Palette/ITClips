import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../../stores/mainStore";
import KebabDropdown from "./KebabDropdown(Feed)";
import darkModeStore from "../../stores/darkModeStore";
import profile_img from "../../assets/images/profile_image.png";

interface Props {
  roadmap: {
    id: number;
    userName: string;
    title: string;
    description: string;
    image: string;
    isPublic: number;
    createdAt: string;
    stepCnt: number; // 단계수
    checkCnt: number; // 체크된 단계수
    likeCnt: number; // 좋아요 수
  };
}

const RoadMap: FC<Props> = ({ roadmap }) => {
  const [isLike, setIsLike] = useState(false);
  const clickHeart = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.stopPropagation();
    setIsLike(!isLike);
    // 여기에 좋아요 api 호출
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
  // const handleUserInfoClick = (
  //   navigate(`/user/${roadmap.id}`)
  // )
  const getRelativeTime = (createdAt: string) => {
    const now = new Date();
    const createdDate = new Date(createdAt);
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
        <div
          id="userInfo"
          className="m-3 flex items-center gap-2"
          // onClick={handleUserInfoClick}
        >
          <div className="w-10 h-10 border rounded-full overflow-hidden">
            <img
              src={profile_img}
              className="w-full h-full object-cover"
              alt=""
            />
          </div>
          <h2>{roadmap.userName}</h2>
          <div className="badge badge-secondary">
            {getRelativeTime(roadmap.createdAt)}
          </div>
        </div>
        <button className="hidden md:inline" onClick={handleDropdownClick}>
          <KebabDropdown whatMenu="로드맵" id={roadmap.id} />
        </button>
      </div>

      <figure className="border rounded-xl mx-5 overflow-hidden">
        <img className="" src={roadmap.image} alt="RoadmapImg" />
      </figure>

      <div className="card-body">
        <h2 className="card-title">{roadmap.title}</h2>
        <p>{roadmap.description}</p>

        <div className="card-actions justify-end flex items-center relative">
          <button onClick={clickHeart} className="btn btn-ghost z-0">
            {isLike ? <FaHeart /> : <FaRegHeart />}
            {roadmap.likeCnt}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoadMap;
