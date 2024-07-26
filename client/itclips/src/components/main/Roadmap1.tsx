// 이미지 , 리스트명, 북마크 개수, 태그, 설명, 좋아요 버튼&좋아요 수, 리스트 세부 조작 버튼
import { useState } from "react";
import useStore from "../../stores/mainStore";
import KebabDropdown from "../common/KebabDropdown";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import darkModeStore from "../../stores/darkModeStore";

const RoadMap  = {
    image: 'asdf',
    title:  '나의 로드맵 01',
    // bookmark_list_tags:;
    description:"로드맵에 관한 설명" ,
    roadmap_like:3,
    percentage: 14.7,
  }



export default function ListItem() {

  const [isLike, setIsLike] = useState(false);
  const clickHeart = (): void => {
    setIsLike(!isLike);
    //여기에 좋아요 api호출
  };

  const isDark = darkModeStore((state) => state.isDark)
  const [isKebab, setIsKebab] = useState(false);

  return (
    <>
    
      <div
        className={(isKebab? '' : (isDark? "hover:brightness-150" : "hover:brightness-95"))  + " card card-side bg-base-100 shadow-xl hover:cursor-pointer h-32"} 
      >
        
          <>
            <figure className="w-28  z-20">
              <img

                src="https://cdn.pixabay.com/photo/2017/07/31/17/12/water-2559064_1280.jpg"
                alt="Movie"
                className="h-full"
              />
            </figure>
        
                <div className="card-body flex flex-row justify-between h-full relative">
                    <div className={(!isDark ? 
                    (RoadMap.percentage == 100 ? 'bg-green-300' : 'bg-sky-100' ) : 
                    (RoadMap.percentage == 100 ? 'bg-green-900' : 'bg-sky-900' ))
                     +" h-full absolute z-0 top-0 left-0" }
                    style={{ width: `${RoadMap.percentage}%` }}
                    ></div>
                    <div className="flex flex-col justify-around z-20">
                        <div>
                        <h2 className=" card-title">{RoadMap.title}</h2>
                        </div>

                        <div>
                        <p>{RoadMap.description}</p>
                        </div>
                    </div>

                    <div className="flex items-center text-blue-400 font-bold text-xl z-0">
                    <p className={(!isDark?(RoadMap.percentage == 100 ? "text-green-500" : "text-blue-400" ):
                          (RoadMap.percentage == 100 ? "text-green-200" : "text-blue-200" ))}>{RoadMap.percentage +'%'}</p>
                    </div>

                    <div className="card-actions justify-end flex items-center">
                        <button onClick={clickHeart} className="btn btn-ghost z-0">
                        {isLike ? <FaHeart /> : <FaRegHeart />}
                        {RoadMap.roadmap_like}{" "}
                        </button>
                        <button onClick={()=>setIsKebab(true)} >
                        <KebabDropdown whatMenu="로드맵" />
                        </button>
                    </div>
                </div>
         
          </>
            
      </div>
    
   
    </>
  );
}
