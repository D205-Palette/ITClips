// 이미지 , 리스트명, 북마크 개수, 태그, 설명, 좋아요 버튼&좋아요 수, 리스트 세부 조작 버튼
import { useState,FC } from "react";
import useStore from "../../stores/mainStore";
import KebabDropdown from "../common/KebabDropdown";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import darkModeStore from '../../stores/darkModeStore'
import { useNavigate } from "react-router-dom";

interface Props {
  list: {
    id: number;
    image: string;
    bookmarks: object[];
    title: string;
    tags: string[];
    description: string;
    likeCount: number;
  };
}

const ListItem : FC<Props> = ({list}) => {

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
        className={(isDark? "hover:bg-slate-700" : "hover:bg-slate-100") + " card card-side bg-base-100 shadow-xl  h-28"} >
          <>
            <figure onClick={()=>navigate('/bookmarklist/:bookmarklist_id')} className="hover:cursor-pointer w-1/6">
              <img
                src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
                alt="Movie"
                className="size-28 object-cover"
              />
            </figure>

            <div className="card-body flex flex-row w-5/6">
              <div className="flex flex-col flex-auto justify-around w-8/12">
                <div onClick={()=>navigate('/bookmarklist/:bookmarklist_id')}>
                  {" "}
                  <h4 className="flex-auto card-title hover:cursor-pointer">{list.title}</h4>{" "}
                </div>
                <div>
                  {" "}
                  {list.tags.map((tag: string) => (
                    <span>{" # " + tag}</span>
                  ))}{" "}
                </div>
              </div>  

              {/* 너무 많아져서 설명은 안에만 넣어도 될듯..? */}

              {/* <div className=" items-center hidden xl:flex ">
                <p>{list.description}</p>
              </div> */}

              <div className="card-actions justify-between flex items-center w-3/12">
                <button onClick={clickHeart} className="btn btn-ghost hidden sm:inline-flex">
                  {isLike ? <FaHeart color="red"/> : <FaRegHeart />}
                  {list.likeCount}
                </button>
                <button className="md:block hidden">
                  <KebabDropdown whatMenu="리스트" id={list.id} />
                </button>
              </div>
            </div>
          </>
        
      </div>
    </>
  );
}



export default ListItem;