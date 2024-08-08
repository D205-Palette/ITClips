// 이미지 , 리스트명, 북마크 개수, 태그, 설명, 좋아요 버튼&좋아요 수, 리스트 세부 조작 버튼
import { useState, FC } from "react";
import useStore from "../../stores/mainStore";
import KebabDropdown from "../common/KebabDropdown";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import darkModeStore from "../../stores/darkModeStore";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { authStore } from "../../stores/authStore";
import { API_BASE_URL } from "../../config";
import type { StepListType } from "../../types/RoadmapType";
import noImg from "../../assets/images/noImg.gif"


interface Props {
  list:StepListType
  count:number;
  changeCount: React.Dispatch<React.SetStateAction<number>>;
}



const ListItem: FC<Props> = ({ list,changeCount,count }) => {

  const navigate = useNavigate();
  const {userId, token} = authStore()
  const isDark = darkModeStore((state) => state.isDark);

  function toggleCheck(isCheck:boolean): void {
    // 체크박스 눌렀을때 axios로 토글 됐다고 보내기
    if(isCheck){
      changeCount(count - 1)
      list.check = false
      axios.put(`${API_BASE_URL}/api/roadmap/step/${list.id}/${userId}`,{headers: {
        Authorization: `Bearer ${token}`,
      },})
    } else {
      changeCount(count + 1)
      list.check = true
      axios.put(`${API_BASE_URL}/api/roadmap/step/${list.id}/${userId}`,{headers: {
        Authorization: `Bearer ${token}`,
      },})
    }

  }
  
  return (
    <>
      <div
        className={
          (isDark ? "hover:brightness-125" : "hover:brightness-95") +
          " card card-side bg-slate-50  h-28 col-span-4 odd:col-start-1  even:col-start-4 mb-10 z-10"
        }
      >
        <>
          <figure
            onClick={() => navigate(`/bookmarklist/${list.bookmarkListRoadmapDTO.id}`)}
            className="hover:cursor-pointer hidden lg:inline "
          >
            <img              
              src={list.bookmarkListRoadmapDTO.image === "default" ? noImg : list.bookmarkListRoadmapDTO.image}
              alt="Movie"
              className="size-28 hidden lg:inline "
            />
          </figure>

          <div className="card-body flex flex-row justify-between">
            <div className="flex flex-row items-center " onClick={() => navigate(`/bookmarklist/${list.bookmarkListRoadmapDTO.id}`)}>
                <h4 className="card-title hover:cursor-pointer text-sm md:text-md lg:text-xl">
                  {list.bookmarkListRoadmapDTO.title}
                </h4>
            </div>
            {/* 체크박스 */}
            <div className="form-control flex flex-row items-center">
              <input
                type="checkbox"
                defaultChecked={list.check? true : false}
                onClick={() => toggleCheck(list.check)}
                className="checkbox checkbox-info  [--chkfg:white]"
              />
            </div>
          </div>
        </>
      </div>
    </>
  );
};

export default ListItem;
