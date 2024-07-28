// 이미지 , 리스트명, 북마크 개수, 태그, 설명, 좋아요 버튼&좋아요 수, 리스트 세부 조작 버튼
import { useState,FC } from "react";
import useStore from "../../stores/mainStore";
import KebabDropdown from "../common/KebabDropdown";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import darkModeStore from '../../stores/darkModeStore'
import mainStore from "../../stores/mainStore";
import { useNavigate } from "react-router-dom";
// const bookmarks = {
//     title: string,
//     url: string,
//     description: string,
//     bookmark_like: number,
//     category: string,
//   }

interface Props {
  bookmark: {
    title: string;
    url: string;
    description: string;
    bookmark_like: number;
    category: string;
    tags: string[];
  }
};


const Bookmark : FC<Props> = ({bookmark}) => {
  const navigate = useNavigate()

  const [isLike, setIsLike] = useState(false);
  const clickHeart = (): void => {
    setIsLike(!isLike);
    //여기에 좋아요 api호출
  };
  const isDark = darkModeStore((state) => state.isDark)
  
  
  return (
    <>
    
      <div
        className={(isDark? "hover:brightness-150" : "hover:brightness-95") + " card card-side bg-base-100 shadow-xl hover:cursor-pointer h-28"} >
          <>
            <div className="card-body flex flex-row items-center" onClick={() => {window.open(`https://https://${bookmark.url}`)}}> 
              {/* 주소에 https 포함 여부 확인해야할듯 */}

              <div className="flex flex-col flex-auto justify-around">
                <div>
                  {" "}
                  <h2 className="flex-auto card-title">{bookmark.title}</h2>{" "}
                </div>
                <div className="underline underline-offset-1">
                  {bookmark.url}
                </div>
              </div>

              <div className="hidden items-center md:inline-flex ">
                {bookmark.tags.map((tag: string) => (
                    <span className='ms-1'>{" # " + tag }</span>
                  ))}{" "}
              </div>

              <div className="card-actions justify-end flex items-center">
                <button onClick={clickHeart} className="btn btn-ghost">
                  {isLike ? <FaHeart color="red"/> : <FaRegHeart />}
                  {bookmark.bookmark_like}{" "}
                </button>
                <button className="">
                  <KebabDropdown whatMenu="리스트" />
                </button>
              </div>
            </div>
          </>
        
      </div>
      
    </>
  );
};
export default Bookmark;