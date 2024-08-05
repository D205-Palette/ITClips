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

interface Props {
  tempCategory:CategoryType;
}

const CategorySingleTab: FC<Props> = ({ tempCategory }) => {

  const params = useParams()
  const {tempCategories, setTempCategories,addTempCategories, deleteTempCategories} = Tab()

  // 새로 생성 했을떄, id가0이라 그거 맞는 id 받아오기 위한 용도
  // useEffect(()=>{
  //   async function fetchData() {
  //     axios({
  //       method: "get",
  //       url: `${API_BASE_URL}/api/list/${params.bookmarklistId}`,
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //       params:{
  //         userId:userId, 
  //       },
  //       })
  //         .then((res) => {
  //           // 이게 고민이다... zustand 쓸라니까 자꾸 랜더 번쩍거리는디
  //           addTempCategories(res.data.categories);
  //       })
  //       .catch((err) => {
  //         console.error(err);
  //       });
  //   }
  //   fetchData();
  // }, [])


  const { userId, token } = authStore();
  const isDark = darkModeStore((state) => state.isDark);
  const color = isDark
    ? "bg-slate-900 text-slate-300 border-solid border-slate-100 border-2 p-1"
    : "bg-slate-0 text-slate-900 border-solid border-slate-900 border-2 p-1";
  const whatCategory = mainTabStore((state) => state.whatCategory);
  const changeCategory = mainTabStore((state) => state.changeCategory);

  const DeleteButton = (): any => {
    function deleteCategory(): void {
      axios({
        method: "delete",
        url: `${API_BASE_URL}/api/category/delete/${tempCategory.categoryId}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          deleteTempCategories(tempCategory)
        })
        .catch((err) => {
          console.error(err);
        });
    }

    return (
      <button
        onClick={() => deleteCategory()}
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
          (tempCategory.categoryName === whatCategory.categoryName
            ? "bg-sky-500 text-slate-100 border-solid border-sky-500 border-2 p-1"
            : color) + " rounded-2xl mx-2 ps-3"
        }
      >
        <div className="flex flex-row items-center">
          <div onClick={() => {changeCategory(tempCategory); console.log(tempCategory);console.log(whatCategory)}}>
            {tempCategory.categoryName}
          </div>{" "}
          <DeleteButton />
        </div>
      </button>
    </>
  );
};

export default CategorySingleTab;
