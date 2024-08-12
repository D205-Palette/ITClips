// 버전 1 : 리스트, 공유 리스트, 즐겨찾기, 로드맵
// 버전 2 : 팔로워, 팔로잉
import { NavLink } from "react-router-dom";
import { FaRegStar, FaStar } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa";
import { FaRegMap } from "react-icons/fa6";
import { MdOutlineBookmarks } from "react-icons/md";
import darkModeStore from "../../stores/darkModeStore";
import { FC, useState } from "react";
import { IoIosClose } from "react-icons/io";
import mainTabStore from "../../stores/mainTabStore";
import { FaPlus } from "react-icons/fa6";
// import categoriesStore from "../../stores/categoriesStore";
import axios from "axios";
import { authStore } from "../../stores/authStore";
import { API_BASE_URL } from "../../config";
import { useEffect } from "react";
import type { CategoryType } from "../../types/BookmarkListType";
import { useParams } from "react-router-dom";
import Tab from "../../stores/mainTabStore";
import mainStore from "../../stores/mainStore";
interface Props {
  tempCategory:CategoryType;
}

const CategorySingleTab: FC<Props> = ({ tempCategory }) => {

  const isDark = darkModeStore((state) => state.isDark);
  const color = isDark
    ? "bg-slate-900 text-slate-300 border-solid border-slate-100 border-2 p-1"
    : "bg-slate-0 text-slate-600 border-solid border-slate-300 border p-1";
  const whatCategory = mainTabStore((state) => state.whatCategory);
  const changeCategory = mainTabStore((state) => state.changeCategory);

  return (
    <>
      <button
        className={
          (tempCategory.categoryName === whatCategory.categoryName
            ? "bg-sky-500 text-slate-100 border-solid border-sky-500 border-2 p-1"
            : color) + " rounded-2xl mx-1 ps-3 h-9"
        }
      >
        <div className="flex flex-row items-center h-2">
          <div onClick={() =>{ changeCategory(tempCategory); console.log(tempCategory)}}
            className="me-2">
            {tempCategory.categoryName}
          </div>{" "}

        </div>
      </button>
    </>
  );
};

export default CategorySingleTab;
