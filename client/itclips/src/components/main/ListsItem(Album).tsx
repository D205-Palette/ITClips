import { useState,FC } from "react";
import useStore from "../../stores/mainStore";
import KebabDropdown from "../common/KebabDropdown";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import ListItemHover from "./ListsItem(AlbumHovering)";
import darkModeStore from '../../stores/darkModeStore'
import { useNavigate } from "react-router-dom";
// 이미지 , 리스트명, 북마크 개수, 태그,(설명), 좋아요 버튼&좋아요 수, 리스트 세부 조작 버튼
// 아님 호버링 기능을 여기에다 포함이 나을듯?

// function Hovering(isHover:boolean){

// }

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

  const [isHover, setIsHovering] = useState(false);
  const [isLike, setIsLike] = useState(false);
  const clickHeart = (): void => {
    setIsLike(!isLike);
    //여기에 좋아요 api호출
  };
  const isDark = darkModeStore((state) => state.isDark)

  return (
    <>
      <div  className={"card w-56 bg-base-100 shadow-xl " +  (isDark? "hover:brightness-150" : "hover:brightness-95")}
      onMouseOver={() => setIsHovering(true)}
      onMouseOut={() => setIsHovering(false)}
      >
          
        <figure className={"w-56 h-56 " + (isDark? "hover:brightness-150" : "hover:brightness-95")} >
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

        <div 
        
        className="card-body flex flex-col p-6 relative ">
            <div className="absolute top-0 right-0 z-50">
              <KebabDropdown whatMenu="리스트"/>
            </div>
          <div className="flex flex-col flex-auto justify-around hover:cursor-pointer ">
            <div>
              <h5 onClick={()=>navigate("/bookmarklist/:bookmarklist_id")} className="flex-auto card-title my-1 ">{list.title}</h5>
            </div>

            <div className="flex justify-between">
              <div className="flex flex-col">
                {list.bookmark_list_tags.map((tag: string) => (
                  <span>{" # " + tag}</span>
                ))}
              </div>
              <div>
                <button onClick={clickHeart} className="btn btn-ghost p-1">
                {isLike ? <FaHeart color="red"/> : <FaRegHeart />}
                  
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
};

export default  ListItem;