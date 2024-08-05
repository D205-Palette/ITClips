// 이미지 , 리스트명, 북마크 개수, 태그, 설명, 좋아요 버튼&좋아요 수, 리스트 세부 조작 버튼
import { useState, FC } from "react";
import useStore from "../../stores/mainStore";
import KebabDropdown from "../common/KebabDropdown";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import darkModeStore from "../../stores/darkModeStore";
import { useNavigate } from "react-router-dom";

interface Props {
  list: {
    id: number;
    roadmapId: number;
    bookmarkListResponseDTO: {
      id: number;
      title: string;
      description: string;
      bookmarkCount: number;
      likeCount: number;
      image: string;
      tags: {title:string}[];
      users: {id:number, nickName:string}[];
    };
    check: boolean;
    order: number;
  };
  changeCount: React.Dispatch<React.SetStateAction<number>>;
}



const ListItem: FC<Props> = ({ list,changeCount }) => {

  const navigate = useNavigate();
  const [isLike, setIsLike] = useState(false);
  const clickHeart = (): void => {
    setIsLike(!isLike);
    //여기에 좋아요 api호출
  };
  const isDark = darkModeStore((state) => state.isDark);

  function toggleCheck(isCheck:boolean): void {
    // 체크박스 눌렀을때 axios로 토글 됐다고 보내기
    if(isCheck){
      changeCount((state) => state - 1)
      list.check = false
    } else {
      changeCount((state) => state + 1)
      list.check = true
    }
    //  여기에 토글하는 api 호출
    //  /roadmap/step/{stepId == list.id}/{userId} 경로로 put 요청
  }
  

  return (
    <>
      <div
        className={
          (isDark ? "hover:brightness-125" : "hover:brightness-95") +
          " card card-side bg-base-100  h-28 col-span-4 odd:col-start-1  even:col-start-4 mb-10 z-10"
        }
      >
        <>
          <figure
            onClick={() => navigate("/bookmarklist/:bookmarklist_id")}
            className="hover:cursor-pointer hidden lg:inline "
          >
            <img
              src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
              alt="Movie"
              className="size-28 hidden lg:inline "
            />
          </figure>

          <div className="card-body flex flex-row justify-between">
            <div className="flex flex-row items-center " onClick={() => navigate("/bookmarklist/:bookmarklist_id")}>
                <h4 className="card-title hover:cursor-pointer text-sm md:text-md lg:text-xl">
                  {list.bookmarkListResponseDTO.title}
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
