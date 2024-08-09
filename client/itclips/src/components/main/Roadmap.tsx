// 이미지 , 리스트명, 북마크 개수, 태그, 설명, 좋아요 버튼&좋아요 수, 리스트 세부 조작 버튼
import { useState } from "react";
import useStore from "../../stores/mainStore";
import KebabDropdown from "../common/KebabDropdown";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import darkModeStore from "../../stores/darkModeStore";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import type { RoadmapSumType } from "../../types/RoadmapType";
import axios from "axios";
import { authStore } from "../../stores/authStore";
import { API_BASE_URL } from "../../config";
import noImg from "../../assets/images/noImg.gif";

interface Props {
  roadmap: RoadmapSumType;
  canEdit:boolean
}

const RoadMap: FC<Props> = ({ roadmap,canEdit }) => {

  const { userId, token } = authStore();
  const [isLike, setIsLike] = useState(roadmap.isLiked);
  const [likeCount, changeLikeCount] = useState(roadmap.likeCnt);

  const clickHeart = (): void => {
    if (isLike) {
      axios.delete(`${API_BASE_URL}/api/roadmap/like/${roadmap.id}/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      changeLikeCount(likeCount - 1);
    } else {
      {
        axios.post(`${API_BASE_URL}/api/roadmap/like/${roadmap.id}/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
      changeLikeCount(likeCount + 1);
    }
    setIsLike(!isLike);
  };
  const isDark = darkModeStore((state) => state.isDark);
  const percentage =(roadmap.stepCnt===0?  "No List" : 
    ((roadmap.checkCnt * 100) / roadmap.stepCnt).toFixed(1)+'%')
  const navigate = useNavigate();

  return (
    <>
      <div
        className={
          (isDark ? "hover:bg-slate-700" : "hover:bg-slate-100") +
          " card card-side bg-base-100 hover:cursor-pointer h-32 my-1 static z-0"
        }
      >
        <>
          <div className="w-1/6 z-10 hidden lg:inline rounded-s-2xl">
            <img
              src={roadmap.image === "default" ? noImg : roadmap.image}
              alt="Movie"
              className="h-full w-full hidden lg:inline  rounded-s-2xl "
            />
          </div>

          <div className="card-body flex flex-row justify-between h-full relative">
            <div
              className={(canEdit? "" : "hidden ") +
                (!isDark
                  ? percentage == "100.0"
                    ? "bg-green-100"
                    : "bg-sky-100"
                  : percentage == "100.0" 
                  ? "bg-green-900"
                  : "bg-sky-900") +
                " h-full absolute z-0 top-0 left-0 rounded-e-2xl lg:rounded-s-none rounded-s-2xl"
              }
              style={{ width: `${percentage}%` }}
              onClick={() => navigate(`/roadmap/${roadmap.id}`)}
            ></div>

            <div
              className="flex flex-col justify-around z-10"
              onClick={() => navigate(`/roadmap/${roadmap.id}`)}
            >
              <div>
                <h2 className=" card-title">{roadmap.title}</h2>
              </div>

              <div>
                <p>{roadmap.description}</p>
              </div>
            </div>

            <div className="flex gap-x-2">
              <div className=" items-center text-blue-400 font-bold text-xl z-0 hidden lg:inline-flex">
                <p
                  className={(canEdit? "" : "hidden ") +
                    (!isDark
                      ? percentage == "100.0"
                        ? "text-green-400"
                        : "text-blue-400"
                      : percentage == "100.0"
                      ? "text-green-200"
                      : "text-blue-200")
                  }
                >
                  {percentage}
                </p>
              </div>
              <div className="justify-end flex items-center">
                <button onClick={clickHeart} className="btn btn-ghost z-0 ">
                  {isLike ? <FaHeart color="red" /> : <FaRegHeart />}
                  {likeCount}{" "}
                </button>
                <div className="hidden md:inline">
                  <KebabDropdown whatMenu="로드맵" id={roadmap.id} />
                </div>                
              </div>              
            </div>
            
          </div>
        </>
      </div>
      <div
        className={
          (isDark ? "border-b-slate-600" : "border-b-slate-200") +
          " h-1 border-b"
        }
      ></div>
    </>
  );
};

export default RoadMap;
