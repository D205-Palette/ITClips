import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import KebabDropdown from "./KebabDropdown(Feed)";
import darkModeStore from "../../stores/darkModeStore";
import profile_img from "../../assets/images/profile_image.png";
import type { BookmarkListSumType } from "../../types/BookmarkListType";
import noImg from "../../assets/images/noImg.gif";
import axios from "axios";
import { API_BASE_URL } from "../../config";
import { authStore } from "../../stores/authStore";

interface BookmarkListSumFeedType extends BookmarkListSumType {
  createdAt: string;
}

interface Props {
  list: BookmarkListSumFeedType;
}

const ListItem: FC<Props> = ({ list }) => {
  const user = list.users.find((user) => user.id === list.userId);
  const { token, userId } = authStore();
  const [isLike, setIsLike] = useState(list.isLiked);
  const [likeCount, changeLikeCount] = useState(list.likeCount);

  // 좋아요
  const clickHeart = (
    event: React.MouseEvent<HTMLButtonElement | HTMLDivElement>
  ): void => {
    event.stopPropagation();

    if (isLike) {
      axios
        .delete(`${API_BASE_URL}/api/list/like/${userId}/${list.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          changeLikeCount(likeCount - 1);
        })
        .catch((error) => {
          console.error("Error unliking the list:", error);
        });
    } else {
      axios
        .post(`${API_BASE_URL}/api/list/like/${userId}/${list.id}`, null, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          changeLikeCount(likeCount + 1);
        })
        .catch((error) => {
          console.error("Error liking the list:", error);
        });
    }

    setIsLike(!isLike);
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
        id="cardHeader"
        className="flex justify-between items-center mx-3"
        onClick={handleDropdownClick}
      >
        {user && (
          <div
            id="userInfo"
            className="m-3 flex items-center gap-2 hover:bg-base-100 rounded-xl p-2"
            onClick={handleNicknameClick(user.id)}
          >
            <div className="w-10 h-10 border rounded-full overflow-hidden">
              <img
                src={user.userImage === "default" ? noImg : user.userImage}
                className="w-full h-full object-cover"
                alt="리스트유저이미지"
              />
            </div>
            <h2>{user.nickName}</h2>
            <div className="badge badge-info text-slate-100">
              {getRelativeTime(list.createdAt)}
            </div>
          </div>
        )}
        <button className="hidden md:inline" onClick={handleDropdownClick}>
          <KebabDropdown whatMenu="리스트" id={list.id} />
        </button>
      </div>

      <figure className="border rounded-xl mx-5 overflow-hidden h-64 bg-sky-100">
        <img
          className="w-full h-full object-contain"
          src={list.image === "default" ? noImg : list.image}
          alt="listImg"
        />
      </figure>

      <div className="card-body">
        <h2 className="card-title ">{list.title}</h2>
        <p className="text-sm md:text-base line-clamp-3">{list.description}</p>

        <div className="card-actions justify-end flex items-center relative mt-2">
          <button
            onClick={clickHeart}
            className="btn btn-ghost hidden sm:inline-flex"
          >
            {isLike ? <FaHeart color="red" /> : <FaRegHeart />}
            {likeCount}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListItem;
