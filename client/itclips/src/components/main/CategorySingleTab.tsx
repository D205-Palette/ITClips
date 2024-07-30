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
import categoriesStore from "../../stores/categoriesStore";

interface Props {
  whatCategory: string;
  index: number;
}

const CategorySingleTab: FC<Props> = ({ whatCategory, index }) => {
  const version = true;

  const isDark = darkModeStore((state) => state.isDark);
  const color = isDark
    ? "bg-slate-900 text-slate-300 border-solid border-slate-100 border-2 p-1"
    : "bg-slate-0 text-slate-900 border-solid border-slate-900 border-2 p-1";
  const categories = categoriesStore((state) => state.categories);
  const deleteCategory = categoriesStore((state) => state.deleteCategory);
  const category = mainTabStore((state) => state.whatCategory);
  const changeCategory = mainTabStore((state) => state.changeCategory);


  const DeleteButton = (): any => {
    return (
      <button
        onClick={() => deleteCategory(whatCategory)
          // 여기에 진짜 카테고리 삭제할 건지 경고창 띄우기
        }
        className={isDark ? "text-slate-100" : "text-slate-900 "}
      >
        <IoIosClose size="24px" />
      </button>
    );
  };

  return (
    <>
      <button
        className={
          (category === whatCategory
            ? "bg-sky-500 text-slate-100 border-solid border-sky-500 border-2 p-1"
            : color) + " rounded-2xl mx-2 ps-3"
        }
      >
        <div className="flex flex-row items-center">
          <div onClick={() => changeCategory(whatCategory)}>{whatCategory}</div>{" "}
          <DeleteButton />
        </div>
      </button>
    </>
  );
};

export default CategorySingleTab;
