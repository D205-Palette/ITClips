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
// 이미지 , 리스트명, 북마크 개수, 태그,(설명), 좋아요 버튼&좋아요 수, 리스트 세부 조작 버튼
// 아님 호버링 기능을 여기에다 포함이 나을듯?

// function Hovering(isHover:boolean){

// }

interface Props {
  list: BookmarkListSumType;
}

const ListItem: FC<Props> = ({ list }) => {
  const { token, userId } = authStore();
  const navigate = useNavigate();

  const [isHover, setIsHovering] = useState(false);
  const [isLike, setIsLike] = useState(list.isLiked);
  const [likeCount, changeLikeCount] = useState(list.likeCount)

  const clickHeart = (): void => {
    if (isLike) {
      axios.delete(`${API_BASE_URL}/api/list/like/${userId}/${list.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }); changeLikeCount(likeCount -1 )
    } else {
      {
        axios.post(`${API_BASE_URL}/api/list/like/${userId}/${list.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
      changeLikeCount(likeCount + 1 )
    } setIsLike(!isLike);
  };
  const isDark = darkModeStore((state) => state.isDark);

  return (
    <>
      <div
        className={
          "card w-56 bg-base-100 shadow-xl " +
          (isDark ? "hover:bg-slate-700" : "hover:bg-slate-100")
        }
        onMouseOver={() => setIsHovering(true)}
        onMouseOut={() => setIsHovering(false)}
      >
        <figure
          className={
            "w-56 h-56 " +
            (isDark ? "hover:brightness-150" : "hover:brightness-95")
          }
        >
          {isHover ? (
            <ListItemHover list={list}/>
          ) : (
            <>
              <img src={`${list.image}`} alt="Movie" className=" w-56" />
            </>
          )}
        </figure>

        <div className="card-body flex flex-col p-6 relative ">
          <div className="absolute top-0 right-0 z-50">
            <KebabDropdown whatMenu="리스트" id={list.id} />
          </div>
          <div className="flex flex-col flex-auto justify-around hover:cursor-pointer ">
            <div>
              <h5
                onClick={() => navigate("/bookmarklist/:bookmarklist_id")}
                className="flex-auto card-title my-1 "
              >
                {list.title}
              </h5>
            </div>

            <div className="flex justify-between">
              <div className="flex flex-col">
                {list.tags.map((tag: { title: string }) => (
                  <span>{" # " + tag.title}</span>
                ))}
              </div>
              <div>
                <button onClick={clickHeart} className="btn btn-ghost p-1">
                  {isLike ? <FaHeart color="red" /> : <FaRegHeart />}

                  {likeCount}
                </button>
              </div>
            </div>
          </div>

          {/* <div className="flex items-center">
                <p>{list.description}</p>
              </div> */}

          <div className="card-actions justify-end flex items-center">
            {/* <button className="btn btn-primary">
                  <HeartButton />
                  {list.bookmark_list_like} 
                </button> */}
            {/* <button>
                  <KebabDropdown />
                </button> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default ListItem;
