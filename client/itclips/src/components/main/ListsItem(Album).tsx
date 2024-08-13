import { useState, FC } from "react";
import useStore from "../../stores/mainStore";
import KebabDropdown from "../common/KebabDropdown";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import ListItemHover from "./ListsItem(AlbumHovering)";
import darkModeStore from "../../stores/darkModeStore";
import { useNavigate } from "react-router-dom";
import type { BookmarkListSumType } from "../../types/BookmarkListType";
import { API_BASE_URL } from "../../config";
import { authStore } from "../../stores/authStore";
import axios from "axios";
import noImg from "../../assets/images/noImg.gif"
// 이미지 , 리스트명, 북마크 개수, 태그,(설명), 좋아요 버튼&좋아요 수, 리스트 세부 조작 버튼
// 아님 호버링 기능을 여기에다 포함이 나을듯?

// function Hovering(isHover:boolean){

// }

interface Props {
  list: BookmarkListSumType;
  whatMenu: string;
  canEdit: boolean;
}

const ListItem: FC<Props> = ({ list, whatMenu, canEdit }) => {
  const { token, userId } = authStore();
  const navigate = useNavigate();

  const [isHover, setIsHovering] = useState(false);
  const [isLike, setIsLike] = useState(list.isLiked);
  const [likeCount, changeLikeCount] = useState(list.likeCount);

  const clickHeart = (): void => {
    if (isLike) {
      axios.delete(`${API_BASE_URL}/api/list/like/${userId}/${list.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      changeLikeCount(likeCount - 1);
    } else {
      {
        axios.post(
          `${API_BASE_URL}/api/list/like/${userId}/${list.id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }
      changeLikeCount(likeCount + 1);
    }
    setIsLike(!isLike);
  };
  const isDark = darkModeStore((state) => state.isDark);

  return (
    <>
      <div
        className={
          "card  bg-base-100 rounded-lg w-64 " +
          (isDark ? "hover:bg-slate-700" : "hover:bg-slate-100")
        }
        onMouseOver={() => setIsHovering(true)}
        onMouseOut={() => setIsHovering(false)}
      >
        {" "}
        {isHover ? (
          <ListItemHover list={list} />
        ) : (
          <figure
            className={
              "size-64 rounded-b-lg overflow-hidden " +
              (isDark ? "hover:brightness-150" : "hover:brightness-95")
            }
          >
            <img
              src={list.image==='default' ? noImg : `${list.image}`}
              alt="Movie"
              className=" w-full h-full object-cover"
            />
          </figure>
        )}
        <div className="card-body flex flex-col py-2 px-6  relative ">
          <div className="absolute top-0 right-0 z-40">
            <KebabDropdown
              whatMenu={whatMenu}
              id={list.id}
              users={list.users}
            />
          </div>
          <div className="flex flex-col justify-around hover:cursor-pointer">
            <div>
              <h5
                onClick={() => navigate(`/bookmarklist/${list.id}`)}
                className="flex-auto card-title my-1 "
              >
                {list.title}
              </h5>
            </div>

            <div className="flex text-slate-400 text-md flex-wrap ">
              {list.tags.map((tag: { title: string }) => (
                <span className="me-3">{" # " + tag.title}</span>
              ))}
            </div>
            <div>
              <button onClick={clickHeart} className="btn btn-ghost p-1">
                {isLike ? <FaHeart color="red" /> : <FaRegHeart color="gray" />}
                <span className={isLike ? "" : "text-slate-500"}>
                  {likeCount}
                </span>
              </button>
            </div>
          </div>

          <div className="card-actions justify-end flex items-center"></div>
        </div>
      </div>
    </>
  );
};

export default ListItem;
