import darkModeStore from "../../stores/darkModeStore";
import { FC } from "react";
import { IoIosClose } from "react-icons/io";
import mainTabStore from "../../stores/mainTabStore";
import type { CategoryType } from "../../types/BookmarkListType";

interface Props {
  tempCategory:CategoryType;
  canEdit:boolean;
}

const CategorySingleTab: FC<Props> = ({ tempCategory,canEdit }) => {
  const isDark = darkModeStore((state) => state.isDark);
  const color = isDark
    ? "bg-slate-900 text-slate-300 border-solid border-slate-100 border-2 p-1"
    : "bg-slate-0 text-slate-600 border-solid border-slate-300 border p-1";
  const whatCategory = mainTabStore((state) => state.whatCategory);
  const changeCategory = mainTabStore((state) => state.changeCategory);
  
  const {setIsDeleteCategoryModalOpen, setDeleteCategory} = mainTabStore()
  
  const DeleteButton = (): any => {

    return (
      <>
        <button
          onClick={() => {setDeleteCategory(tempCategory.categoryId);setIsDeleteCategoryModalOpen(true)}}
          className={(isDark ? "text-slate-100" : "text-slate-900 ")+ " hidden md:block"}
        >
          <IoIosClose size="24px" />
        </button>
      </>
    );
  };

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
          <div onClick={() =>{ changeCategory(tempCategory)}}
            className="me-2">
            {tempCategory.categoryName}
          </div>{" "}
          {canEdit ? <DeleteButton /> : <></>}
        </div>
        
      </button>
    </>
  );
};

export default CategorySingleTab;
