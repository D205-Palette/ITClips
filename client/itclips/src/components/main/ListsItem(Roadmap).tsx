import { FC } from "react";
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
  canEdit:boolean
}

const ListItem: FC<Props> = ({ list,changeCount,count,canEdit }) => {

  const navigate = useNavigate();
  const {userId, token} = authStore()
  const isDark = darkModeStore((state) => state.isDark);

  function toggleCheck(isCheck:boolean): void {
    // 체크박스 눌렀을때 axios로 토글 됐다고 보내기
    if(isCheck){
      changeCount(count - 1)
      list.check = false
      axios.put(`${API_BASE_URL}/api/roadmap/step/${list.id}/${userId}`,{},{headers: {
        Authorization: `Bearer ${token}`,
      },})
    } else {
      changeCount(count + 1)
      list.check = true
      axios.put(`${API_BASE_URL}/api/roadmap/step/${list.id}/${userId}`,{},{headers: {
        Authorization: `Bearer ${token}`,
      },})
    }
  }
  
  return (
    <>
      <div
        className={
          (isDark ? "hover:brightness-125" : "hover:brightness-95") +
          " card card-side bg-base-100  h-24 col-span-4 odd:col-start-1  even:col-start-4 mb-10 z-10 w-full"
        }
      >
        <>
          <figure
            onClick={() => navigate(`/bookmarklist/${list.bookmarkListRoadmapDTO.id}`)}
            className="hover:cursor-pointer  rounded-2xl w-24"
          >
            <img              
              src={list.bookmarkListRoadmapDTO.image === "default" ? noImg : list.bookmarkListRoadmapDTO.image}
              alt="noImage"
              className="size-24  "
            />
          </figure>

          <div className="card-body flex flex-row justify-between w-2/3">
            <div className="flex flex-row items-center w-3/4" onClick={() => navigate(`/bookmarklist/${list.bookmarkListRoadmapDTO.id}`)}>
                <p className="font-bold hover:cursor-pointer text-sm md:text-md lg:text-xl truncate text-ellipsis ">
                  {list.bookmarkListRoadmapDTO.title}
                </p>
            </div>
            {/* 체크박스 */}
            <div className={(canEdit?"":"hidden ") + "form-control flex flex-row items-center"}>
              <input
                type="checkbox"
                checked={list.check? true : false}
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
