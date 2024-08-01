// 버전 1 : 리스트, 공유 리스트, 즐겨찾기, 로드맵
// 버전 2 : 팔로워, 팔로잉
import { NavLink } from "react-router-dom";
import { FaRegStar, FaStar } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa";
import { FaRegMap } from "react-icons/fa6";
import { MdOutlineBookmarks } from "react-icons/md";
// import mainTabStore from "../../stores/mainTabStore";
import darkModeStore from "../../stores/darkModeStore";
import CategorySingleTab from "./CategorySingleTab";
import { useState, useRef, FC,useEffect } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";
import categoriesStore from "../../stores/categoriesStore";
// 조건 맞는애들만 카테고리 필터 해주는 거 ㅇㅋㅇㅋ
import { useNavigate } from "react-router-dom";

interface Props {
  categories: { categoryId: number; categoryName: string }[];
}

const CategoryTab: FC<Props> = ({ categories }) => {

  const isDark = darkModeStore((state) => state.isDark);
  // const categories = categoriesStore((state) => state.categories);

  const addCategory = categoriesStore((state) => state.addCategory);

  
  const [createMode, modeChange] = useState(false);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (createMode && inputRef.current) {
      inputRef.current.focus();
    }
  }, [createMode]);
  
  // 뒤로가기 버튼
  const BackButton = (): any => {
    return (
      <button className="me-5  " onClick={() => navigate(-1)}>
        <IoIosArrowBack size="40px" />{" "}
      </button>
    );
  };

  // 카테고리 추가 버튼
  const PlusButton = () => {
    return (
      <button
        onClick={() => {
          modeChange(true);
          // clickCreateBtn();
        }}>
        <FaPlus className="ms-2 " />
      </button>
    );
  };

  // 카테고리 추가하는 input 탭
  const CreateCategorySection = () => {
    const [inputValue, changeInputValue] = useState<string>("");

    const createCategory = (event: React.FormEvent): void => {
      event.preventDefault();
      // 카테고리 추가 api
      //   /category/add/{listId}경로로 {categoryName:inputValue}와 함께 POST

      addCategory(inputValue);
      modeChange(false); // 추가하면 추가 모드 off
    };

    return (
      <form onSubmit={createCategory}>
        <input
          ref={inputRef}
          type="text"
          id=""
          name=""
          onChange={(e) => changeInputValue(e.target.value)}
          value={inputValue}
          className={
            (isDark ? "border-slate-100" : "border-slate-900 ") +
            " border-2 border-solid  rounded-2xl h-9 px-4 w-min"
          }
        />
      </form>
    );
  };

  // 상하 스크롤로 좌우 스크롤 가능하게
  function handleScroll(event: any) {
    const container = event.target;
    const scrollAmount = event.deltaY;
    container.scrollTo({
      top: 0,
      left: container.scrollLeft + scrollAmount,
      behavior: "smooth",
    });
  }

  return (
    <>
      <div className="flex flex-row m-3 items-centerpy-5 ">
        <BackButton />
        <div
          className=" flex flex-row  whitespace-nowrap  container overflow-x-scroll "
          onWheel={handleScroll}
        >
          {categories.map((category, index) => (
            <CategorySingleTab whatCategory={category} index={index} />
          ))}
          {createMode ? (
            <CreateCategorySection />
          ) : (
            <PlusButton />
          )}
        </div>
      </div>
    </>
  );
};

export default CategoryTab;
