// 이미지 , 리스트명, 북마크 개수, 태그, 설명, 좋아요 버튼&좋아요 수, 리스트 세부 조작 버튼
import { useState } from "react";
import useStore from "../../stores/mainStore";
import KebabDropdown from "../common/KebabDropdown";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import darkModeStore from "../../stores/darkModeStore";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  roadmap: {
    image: string;
    title: string;
    description: string;
    roadmap_like: number;
    percentage: number;
  };
}

const RoadMap : FC<Props> = (({roadmap}) => {

  const [isLike, setIsLike] = useState(false);
  const clickHeart = (): void => {
    setIsLike(!isLike);
    //여기에 좋아요 api호출
  };

  const isDark = darkModeStore((state) => state.isDark);
  const [isKebab, setIsKebab] = useState(false);
  const [isDropDown, setIsDropDown] = useState(false);
  const navigate = useNavigate()

  return (
    <>
      <div
        className={
          (isKebab
            ? ""
            : isDark
            ? "hover:brightness-150"
            : "hover:brightness-95") +
          " card card-side bg-base-100 shadow-xl hover:cursor-pointer h-32"
        }
      >
        <>
          <figure className="w-28  z-20">
            <img src={roadmap.image} alt="Movie" className="h-full" />
          </figure>

          <div className="card-body flex flex-row justify-between h-full relative">
            <div
              className={
                (!isDark
                  ? roadmap.percentage == 100
                    ? "bg-green-300"
                    : "bg-sky-100"
                  : roadmap.percentage == 100
                  ? "bg-green-900"
                  : "bg-sky-900") + " h-full absolute z-0 top-0 left-0"
              }
              style={{ width: `${roadmap.percentage}%` }}
            ></div>
            <div className="flex flex-col justify-around z-20">
              <div  onClick={()=>navigate(':roadmap_id')}>
                <h2 className=" card-title">{roadmap.title}</h2>
              </div>

              <div>
                <p>
                  {roadmap.description} {isKebab}
                </p>
              </div>
            </div>

            <div className=" items-center text-blue-400 font-bold text-xl z-0 hidden lg:inline-flex">
              <p
                className={
                  !isDark
                    ? roadmap.percentage == 100
                      ? "text-green-500"
                      : "text-blue-400"
                    : roadmap.percentage == 100
                    ? "text-green-200"
                    : "text-blue-200"
                }
              >
                {roadmap.percentage + "%"}
              </p>
            </div>

            <div className="card-actions justify-end flex items-center">
              <button onClick={clickHeart} className="btn btn-ghost z-0 ">
                {isLike ? <FaHeart /> : <FaRegHeart />}
                {roadmap.roadmap_like}{" "}
              </button>
              <button
                onClick={() => setIsKebab(true)}
                className="hidden md:inline"
              >
                <KebabDropdown whatMenu="로드맵" />
              </button>
            </div>
          </div>
        </>
      </div>
    </>
  );
}
)

export default RoadMap;