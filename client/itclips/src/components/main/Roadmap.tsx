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
    percentage: 58.1,
  }



export default function ListItem() {

  const [isHover, setIsHovering] = useState(false);
  const [isLike, setIsLike] = useState(false);
  const clickHeart = (): void => {
    setIsLike(!isLike);
    //여기에 좋아요 api호출
  };

  const isDark = darkModeStore((state) => state.isDark)

  return (
    <>
    
      <div
        className={(isDark? "hover:brightness-150" : "hover:brightness-95") + " card card-side bg-base-100 shadow-xl hover:cursor-pointer h-32"} 
        onMouseOver={() => setIsHovering(true)}
        onMouseOut={() => setIsHovering(false)}
      >
        
          <>
            <figure className="w-28  z-20">
              <img
                src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
                alt="Movie"
        
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
                        <button>
                        <KebabDropdown whatMenu="로드맵" />
                        </button>
                    </div>
                </div>
         
          </>
            
      </div>
    
   
    </>
  );
}
