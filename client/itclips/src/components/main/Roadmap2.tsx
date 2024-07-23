// 이미지 , 리스트명, 북마크 개수, 태그, 설명, 좋아요 버튼&좋아요 수, 리스트 세부 조작 버튼
import { useState } from "react";
import useStore from "../../stores/mainStore";
import KebabDropdown from "../common/KebabDropdown";
import { FaHeart, FaRegHeart } from "react-icons/fa";


const RoadMap  = {
    image: 'asdf',
    title:  '나의 로드맵 01',
    // bookmark_list_tags:;
    description:"로드맵에 관한 설명" ,
    roadmap_like:3,
    percentage: 100,
  }
  

export default function ListItem() {

  const [isHover, setIsHovering] = useState(false);
  const [isLike, setIsLike] = useState(false);
  const clickHeart = (): void => {
    setIsLike(!isLike);
    //여기에 좋아요 api호출
  };

  return (
    <>
      <div
        className="card card-side bg-base-100 shadow-xl hover:cursor-pointer hover:bg-slate-50 h-32" 
        onMouseOver={() => setIsHovering(true)}
        onMouseOut={() => setIsHovering(false)}
      >
          <>
            <figure className="w-28">
              <img

                src="https://cdn.pixabay.com/photo/2017/08/27/15/38/surfing-2686450_1280.jpg"
                alt="Movie"
                className="size-full"
              />
            </figure>

            <div className="card-body flex flex-row justify-between h-full relative">
                    <div className={(RoadMap.percentage == 100 ? 'bg-green-100' : 'bg-sky-100' ) +" h-full absolute z-0 top-0 left-0 rounded-e-2xl" }
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

                    <div className="flex items-center  font-bold text-xl z-20">
                        <p className={(RoadMap.percentage == 100 ? "text-green-500" : "text-blue-400" )}>{RoadMap.percentage +'%'}</p>
                    </div>

                    <div className="card-actions justify-end flex items-center">
                        <button onClick={clickHeart} className="btn btn-ghost">
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
