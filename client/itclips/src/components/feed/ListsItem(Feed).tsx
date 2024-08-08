import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import KebabDropdown from "./KebabDropdown(Feed)";
import darkModeStore from "../../stores/darkModeStore";
import profile_img from "../../assets/images/profile_image.png";
import type { BookmarkListSumType } from "../../types/BookmarkListType";

interface BookmarkListSumFeedType extends BookmarkListSumType {
  createdAt: string;  
}

interface Props {
  list: BookmarkListSumFeedType;
  }

const ListItem: FC<Props> = ({ list }) => {
  const [isLike, setIsLike] = useState(false);
  const clickHeart = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.stopPropagation();
    setIsLike(!isLike);
    // 여기에 좋아요 api 호출
  };

  const isDark = darkModeStore((state) => state.isDark);
  const navigate = useNavigate();

  const handleCardClick = (): void => {
    navigate(`/bookmarklist/${list.id}`);
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
    createdDate.setHours(createdDate.getHours()+9);
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
        id="cardHeader"
        className="flex justify-between items-center mx-3"
        onClick={handleDropdownClick}
      >
        <div
          id="userInfo"
          className="m-3 flex items-center gap-2 hover:bg-base-100 rounded-xl p-2"
          onClick={handleNicknameClick(list.users[0].id)}
        >
          <div className="w-10 h-10 border rounded-full overflow-hidden">
            <img
              src={''
                // list.users[0].image 유저이미지 오면 받아서 넣어야함.
              }
              className="w-full h-full object-cover"
              alt="리스트유저이미지"
            />
          </div>
          <h2>{list.users[0].nickName}</h2>
          <div className="badge badge-secondary">
            {getRelativeTime(list.createdAt)}
          </div>
        </div>
        
        <button className="hidden md:inline" onClick={handleDropdownClick}>
          <KebabDropdown whatMenu="리스트" id={list.id} />
        </button>
      </div>

      <figure className="border rounded-xl mx-5 overflow-hidden h-64">
        <img
          className="w-full h-full object-contain"
          src={list.image}
          alt="listImg"
        />
      </figure>

      <div className="card-body">
        <h2 className="card-title ">{list.title}</h2>
        <p className="text-sm md:text-base line-clamp-3">{list.description}</p>

        <div className="card-actions justify-end flex items-center relative mt-2">
          <button onClick={clickHeart} className="btn btn-ghost z-0">
            {isLike ? <FaHeart /> : <FaRegHeart />}
            {list.likeCount}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListItem;
