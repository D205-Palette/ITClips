// 이미지 , 리스트명, 북마크 개수, 태그, 설명, 좋아요 버튼&좋아요 수, 리스트 세부 조작 버튼
import { useState,FC } from "react";
import useStore from "../../stores/mainStore";
import KebabDropdown from "../common/KebabDropdown";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import darkModeStore from "../../stores/darkModeStore";
import { useNavigate } from "react-router-dom";


interface Props {
  list: {
    pk: number;
    image: string;
    bookmarks: object[];
    title: string;
    bookmark_list_tags: string[];
    description: string;
    bookmark_list_like: number;
  }
};

const ListItem : FC<Props> = ({list}) => {

  const navigate = useNavigate();
  const [isLike, setIsLike] = useState(false);
  const clickHeart = (): void => {
    setIsLike(!isLike);
    //여기에 좋아요 api호출
  };
  const isDark = darkModeStore((state) => state.isDark);

  return (
    <>
      <div
        className={
          (isDark ? "hover:brightness-150" : "hover:brightness-95") +
          " card card-side bg-base-100 shadow-xl  h-28 col-span-3"
        }
      >
        <>
          <figure
            onClick={() => navigate("/bookmarklist/:bookmarklist_id")}
            className="hover:cursor-pointer"
          >
            <img
              src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
              alt="Movie"
              className="size-28"
            />
          </figure>

          <div className="card-body flex flex-row">
            <div className="flex flex-col flex-auto justify-around ">
              <div onClick={() => navigate("/bookmarklist/:bookmarklist_id")}>
                {" "}
                <h4 className="flex-auto card-title hover:cursor-pointer">
                  {list.title}
                </h4>
              </div>
            </div>
            {/* 체크박스 */}
            <div className="form-control">
              <label className="cursor-pointer label">
                <input
                  type="checkbox"
                  
                  className="checkbox checkbox-info"
                />
              </label>
            </div>
          </div>
        </>
      </div>
    </>
  );
};


export default ListItem;