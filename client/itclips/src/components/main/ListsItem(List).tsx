// 이미지 , 리스트명, 북마크 개수, 태그, 설명, 좋아요 버튼&좋아요 수, 리스트 세부 조작 버튼
import { useState } from "react";
import useStore from "../../stores/mainStore";
import KebabDropdown from "../common/KebabDropdown";
import { FaHeart, FaRegHeart } from "react-icons/fa";



export default function ListItem() {
  const list = useStore((state) => state);
  const [isHover, setIsHovering] = useState(false);
  const [isLike, setIsLike] = useState(false);
  const clickHeart = (): void => {
    setIsLike(!isLike);
    //여기에 좋아요 api호출
  };

  return (
    <>
      <div
        className="card card-side bg-base-100 shadow-xl hover:cursor-pointer hover:bg-slate-50 h-28" 
        onMouseOver={() => setIsHovering(true)}
        onMouseOut={() => setIsHovering(false)}
      >

          <>
            <figure>
              <img
                src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
                alt="Movie"
                className="size-28"
              />
            </figure>

            <div className="card-body flex flex-row">
              <div className="flex flex-col flex-auto justify-around">
                <div>
                  {" "}
                  <h2 className="flex-auto card-title">{list.title}</h2>{" "}
                </div>
                <div>
                  {" "}
                  {list.bookmark_list_tags.map((tag: string) => (
                    <span>{" # " + tag}</span>
                  ))}{" "}
                </div>
              </div>

              <div className="flex items-center">
                <p>{list.description}</p>
              </div>

              <div className="card-actions justify-end flex items-center">
                <button onClick={clickHeart} className="btn btn-ghost">
                  {isLike ? <FaHeart /> : <FaRegHeart />}
                  {list.bookmark_list_like}{" "}
                </button>
                <button>
                  <KebabDropdown />
                </button>
              </div>
            </div>
          </>
        
      </div>
    </>
  );
}
