import darkModeStore from "../../stores/darkModeStore";
import { FC, useState } from "react";
import mainTabStore from "../../stores/mainTabStore";
import axios from "axios";
import { authStore } from "../../stores/authStore";
import { API_BASE_URL } from "../../config";
import { useEffect } from "react";
import type { CategoryType } from "../../types/BookmarkListType";
import mainStore from "../../stores/mainStore";
import { FaCheck } from "react-icons/fa";

interface Props {
  tempCategory: CategoryType;
  canEdit: boolean;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const CategorySingleTab: FC<Props> = ({
  tempCategory,
}) => {

  const { setIsBookmarkListChange } = mainStore();
  const { userId, token } = authStore();
  const isDark = darkModeStore((state) => state.isDark);
  const color = isDark
    ? "bg-slate-900 text-slate-300 border-solid border-slate-100 border-2 p-1"
    : "bg-slate-0 text-slate-900 border-solid border-slate-900 border-2 p-1";
  const {whatCategory,changeCategory} = mainTabStore()
  const [tempTag, setTempTag] = useState(tempCategory.categoryName);
  const [isMaxLength, setIsMaxLenth] = useState(false);

  const editCategory = (event: any): void => {
    if (event.key === "Enter") {
      axios
        .put(
          `${API_BASE_URL}/api/category/update/${tempCategory.categoryId}`,
          {
            categoryName: tempTag,
          },
          {
            params: {
              userId: userId,
            },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(() => {
          setIsBookmarkListChange(true);
        });
    }
  };

  useEffect(() => {
    if (tempTag.length === 20) {
      setIsMaxLenth(true);
    } else {
      setIsMaxLenth(false);
    }
  }, [tempTag.length]);

  return (
    <>
      <button
        className={
          (isMaxLength ? "border-red-500 " : " border-sky-500 ") +
          (tempCategory.categoryName === whatCategory.categoryName
            ? "bg-sky-500 text-slate-100 border-solid  border-2 p-1"
            : color) +
          " rounded-2xl mx-2 ps-3 w-36 flex flex-row items-center"
        }
  
      >
        <div className="me-2 ">
          <input
            type="text"
            value={tempTag}
            className={
              (whatCategory.categoryName === tempCategory.categoryName
                ? "bg-sky-500 text-slate-100"
                : "") + " w-24"
            }
            onChange={(e) => setTempTag(e.target.value)}
            onKeyDown={(e) => editCategory(e)}
            maxLength={20}
          />
        </div>{" "}
        
        <div onClick={() => changeCategory(tempCategory)}>
          {whatCategory.categoryName === tempCategory.categoryName ? (
            <FaCheck color="white" size={18} />
          ) : (
            <FaCheck style={{color: "#d3dedc",}} size={18} />
          )}
        </div>
      </button>
    </>
  );
};

export default CategorySingleTab;
