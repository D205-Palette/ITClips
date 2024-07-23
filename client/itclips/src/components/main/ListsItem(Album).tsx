import { useState } from "react";
import useStore from "../../stores/mainStore";
import KebabDropdown from "../common/KebabDropdown";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import ListItemHover from "./ListsItem(AlbumHovering)";

// 이미지 , 리스트명, 북마크 개수, 태그,(설명), 좋아요 버튼&좋아요 수, 리스트 세부 조작 버튼
// 아님 호버링 기능을 여기에다 포함이 나을듯?

// function Hovering(isHover:boolean){

// }

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
      <div className="card w-56 bg-base-100 shadow-xl">
          
        <figure
          onMouseOver={() => setIsHovering(true)}
          onMouseOut={() => setIsHovering(false)}
          className="w-56 h-56"
        >
          
          {isHover ? (
            <ListItemHover />
          ) : (
            <>
              <img
                src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
                alt="Movie"
                className=" w-56"
              />
            </>
          )}
        </figure>

        <div className="card-body flex flex-col p-6 relative ">
            <div className="absolute top-0 right-0 z-50">
              <KebabDropdown whatMenu="리스트"/>
            </div>
          <div className="flex flex-col flex-auto justify-around">
            <div>
              <h5 className="flex-auto card-title my-1">{list.title}</h5>
            </div>

            <div className="flex justify-between">
              <div className="flex flex-col">
                {list.bookmark_list_tags.map((tag: string) => (
                  <span>{" # " + tag}</span>
                ))}
              </div>
              <div>
                <button onClick={clickHeart} className="btn btn-ghost p-1">
                {isLike ? <FaHeart /> : <FaRegHeart />}
                  
                  {list.bookmark_list_like}
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
}
