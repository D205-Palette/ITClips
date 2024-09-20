import { useState, FC } from "react";
import KebabDropdown from "../common/KebabDropdown";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import darkModeStore from "../../stores/darkModeStore";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import type { BookmarkListSumType } from "../../types/BookmarkListType";
import { API_BASE_URL } from "../../config";
import { authStore } from "../../stores/authStore";
import noImg from "../../assets/images/noImg.gif";

interface Props {
  list: BookmarkListSumType;
  whatMenu: string;
}

const ListItem: FC<Props> = ({ list, whatMenu }) => {
  const { token, userId } = authStore();
  const navigate = useNavigate();
  const [isLike, setIsLike] = useState(list.isLiked);
  const [likeCount, changeLikeCount] = useState(list.likeCount);
  const isDark = darkModeStore((state) => state.isDark);

  // 좋아요
  const clickHeart = (): void => {
    if (isLike) {
      axios.delete(`${API_BASE_URL}/api/list/like/${userId}/${list.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      changeLikeCount(likeCount - 1);
    } else {
      axios.post(
        `${API_BASE_URL}/api/list/like/${userId}/${list.id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      changeLikeCount(likeCount + 1);
    }
    setIsLike(!isLike);
  };

  return (
    <>
      <div
        className={
          (isDark ? "hover:bg-slate-700" :   "hover:bg-slate-100") +
          " card card-side bg-base-100 h-28 rounded-lg  "
        }
      >
        <>
          <figure
            onClick={() => navigate(`/bookmarklist/${list.id}`)}
            className="hover:cursor-pointer w-28 overflow-hidden rounded-e-lg"
          >
            <img
              src={list.image === "default" ? require(`../../assets/images/noContent${list.id % 6}.png`) : list.image}
              alt="Movie"
              className=" object-cover w-28 h-full"
            />
          </figure>

          <div className="card-body flex flex-row  justify-between w-1/2 md:w-3/4 md:p-8">
            <div className="flex flex-col  justify-around w-2/3  ">
              <div>
                <p
                  className=" hover:cursor-pointer truncate text-ellipsis w-5/6 font-bold text-lg "
                  onClick={() => navigate(`/bookmarklist/${list.id}`)}
                >
                  {list.title}
                </p>
              </div>
              <div className="line-clamp-1">
                {" "}
                {list.tags.map((tag: { title: string }) => (
                  <span>{" # " + tag.title}</span>
                ))}{" "}
              </div>
            </div>

            <div className="card-actions justify-between flex items-center w-1/3">
              <button
                onClick={clickHeart}
                className="btn btn-ghost inline-flex"
              >
                {isLike ? <FaHeart color="red" /> : <FaRegHeart />}
                {likeCount}
              </button>
              <div className="lg:block hidden">
                <KebabDropdown
                  whatMenu={whatMenu}
                  id={list.id}
                  users={list.users}
                />
              </div>
            </div>
          </div>
        </>
      </div>
      {/* 구분선 */}
      <div
        className={
          (isDark ? "border-b-slate-600" : "border-b-slate-200") +
          " h-1 border-b"
        }
      ></div>
    </>
  );
};

export default ListItem;
