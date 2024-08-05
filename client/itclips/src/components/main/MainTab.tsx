// 버전 1 : 리스트, 공유 리스트, 즐겨찾기, 로드맵
// 버전 2 : 팔로워, 팔로잉
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaRegStar, FaStar } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa";
import { FaRegMap } from "react-icons/fa6";
import { MdOutlineBookmarks } from "react-icons/md";
// import tabStore from "../../stores/mainTabStore";
import darkModeStore from "../../stores/darkModeStore";
// import mainTabStore from "../../stores/mainTabStore";
import { BsHeartFill } from "react-icons/bs";
import { BsFillPeopleFill } from "react-icons/bs";
import { authStore } from "../../stores/authStore";
import { useParams } from "react-router-dom";

export default function MainTab() {
  const isDark = darkModeStore((state) => state.isDark);
  const textColor = isDark ? "text-slate-300" : "text-slate-900";
  const params = useParams()
  const nowUserId = params.userId

  // const {userId} = authStore()

  return (
    <>
      <div className="flex justify-around">
        <NavLink
          to={`/user/${nowUserId}`}
          end
          className={({ isActive }) =>
            isActive
              ? "text-sky-500 font-bold flex flex-row items-center"
              : textColor + " font-bold flex flex-row items-center"
          }
        >
          <div className="mx-2">
            <FaRegBookmark />
            </div>
          <div className="hidden md:block">북마크 리스트</div>
       
        </NavLink>

        <NavLink
          to={`/user/${nowUserId}/groupbookmarklist`}
          className={({ isActive }) =>
            isActive
              ? "text-sky-500 font-bold flex flex-row items-center"
              : textColor + " font-bold flex flex-row items-center"
          }
        >
            <div className="mx-2">
              <MdOutlineBookmarks />
            </div>
            <div className="hidden md:block">그룹 북마크 리스트</div>
      
        </NavLink>
        <NavLink
          to={`/user/${nowUserId}/favorites`}
          className={({ isActive }) =>
            isActive
              ? "text-sky-500 font-bold flex flex-row items-center"
              : textColor + " font-bold flex flex-row items-center"
          }
        >
            <div className=" mx-2">
              <FaRegStar />
            </div>
            <div className="hidden md:block">즐겨찾기</div>
       
        </NavLink>
        <NavLink
          to={`/user/${nowUserId}/roadmap`}
          className={({ isActive }) =>
            isActive
              ? "text-sky-500 font-bold flex flex-row items-center"
              : textColor + " font-bold flex flex-row items-center"
          }
        >
            <div className=" mx-2">
              <FaRegMap />
            </div>
            <div className="hidden md:block">로드맵</div> 

        </NavLink>
      </div>
    </>
  );
}
