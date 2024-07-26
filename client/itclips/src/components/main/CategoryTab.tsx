// 버전 1 : 리스트, 공유 리스트, 즐겨찾기, 로드맵
// 버전 2 : 팔로워, 팔로잉
import { NavLink } from "react-router-dom";
import { FaRegStar, FaStar } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa";
import { FaRegMap } from "react-icons/fa6";
import { MdOutlineBookmarks } from "react-icons/md";
import mainTabStore from "../../stores/mainTabStore";
import darkModeStore from "../../stores/darkModeStore";
import CategorySingleTab from "./CategorySingleTab";
import { useState, useRef } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";
import categoriesStore from "../../stores/categoriesStore";
// 조건 맞는애들만 카테고리 필터 해주는 거 ㅇㅋㅇㅋ

export default function CategoryTab() {
  const isDark = darkModeStore((state) => state.isDark);
  const categories = categoriesStore((state) => state.categories);
  const addCategory = categoriesStore((state) => state.addCategory);

  const onFocus = useRef<HTMLInputElement>(null);
  const [createMode, modeChange] = useState(false);

  // 뒤로가기 버튼
  const BackButton = (): any => {
    return (
      <button className="me-5  ">
        <IoIosArrowBack />{" "}
      </button>
    );
  };

  // 카테고리 추가 버튼
  const PlusButton = (): any => {
    onFocus.current?.focus();
    return (
      <button onClick={() => modeChange(true)}>
        <FaPlus className="ms-2" />
      </button>
    );
  };

  // 카테고리 추가하는 input 창
  const CreateCategorySection = (): any => {
    const [inputValue, changeInputValue] = useState("");
    
    const createCategory = (): void => {
      // 카테고리 추가 api
      // 엔터 눌러도 되고 다른 부분 클릭해도 되게할까...?
      addCategory(inputValue);
      modeChange(false); // 추가하면 추가 모드 off
    };
    return (
      <form onSubmit={createCategory}>
        <input
          onChange={(e) => changeInputValue(e.target.value)}
          value={inputValue}
          ref={onFocus}
          className={
            (isDark ? "border-slate-100" : "border-slate-900 ") +
            " border-2 border-solid  rounded-2xl h-9 px-4 w-min"
          }
        />
      </form>
    );
  };

  

  function handleScroll (event:any) {
    const container = event.target;
    const scrollAmount = event.deltaY;
    container.scrollTo({
      top: 0,
      left: container.scrollLeft + scrollAmount,
      behavior: 'smooth'
    });
  };
  
  

  
  return (
    <>
      <div className="flex flex-row m-3 items-center whitespace-nowrap  container overflow-x-scroll py-5 " onWheel={handleScroll}>
        <BackButton />
        
        {categories.map((category, index) => (
          <CategorySingleTab whatCategory={category} index={index}  />
        ))}
        {/* {categories.map((category)=>  TabButton (whatCategory, category))  } */}
        {createMode ? <CreateCategorySection /> : <PlusButton />}
      </div>
    </>
  );
}
