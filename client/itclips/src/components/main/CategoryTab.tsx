import darkModeStore from "../../stores/darkModeStore";
import CategorySingleTab from "./CategorySingleTab";
import CategorySingleEditTab from "./CategorySingleTab(Edit)";
import { useState, useRef, FC, useEffect } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { authStore } from "../../stores/authStore";
import { API_BASE_URL } from "../../config";
import { CategoryType } from "../../types/BookmarkListType";
import mainStore from "../../stores/mainStore";
import { useDraggable } from "react-use-draggable-scroll";

interface Props {
  listId: number;
  categories: CategoryType[];
  canEdit: boolean; // 본인 여부
  editMode: boolean; // 에딧 모드 여부
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const CategoryTab: FC<Props> = ({
  listId,
  categories,
  canEdit,
  editMode,
  setEditMode,
}) => {
  const { userId, token } = authStore();
  const isDark = darkModeStore((state) => state.isDark);

  const [createMode, modeChange] = useState(false);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const { setIsBookmarkListChange } = mainStore();

  const [categoryLengthWarning, setCategoryLengthWarning] = useState(
    categories.length >= 3
  );

  useEffect(() => {
    if (createMode && inputRef.current) {
      inputRef.current.focus();
    }
  }, [createMode]);

  useEffect(() => {
    if (categories.length >= 3) {
      setCategoryLengthWarning(true);
    } else {
      setCategoryLengthWarning(false);
    }
  }, [categories.length]);

  // 뒤로가기 버튼
  const BackButton = (): any => {
    return (
      <button className="me-2  " onClick={() => navigate(-1)}>
        <IoIosArrowBack size="36px" />{" "}
      </button>
    );
  };

  // 카테고리 추가 버튼
  const PlusButton = () => {
    return (
      <button
        onClick={() => {
          modeChange(true);
        }}
        className={categoryLengthWarning ? "hidden" : "hidden md:block"}
      >
        <FaPlus className="ms-2 " />
      </button>
    );
  };

  // 카테고리 추가하는 input 탭
  const CreateCategorySection = () => {
    const [inputValue, changeInputValue] = useState<string>("");

    const createCategory = (): void => {
      // 카테고리 추가 api
      axios({
        method: "post",
        url: `${API_BASE_URL}/api/category/add/${listId}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          userId: userId,
        },
        data: {
          categoryName: inputValue,
        },
      })
        .then((res) => {
          setIsBookmarkListChange(true);
        })
        .catch((err) => {
          console.error(err);
        });
      modeChange(false); // 추가하면 추가 모드 off
    };

    return (
      <div className="relative flex items-center">
        <form
          onSubmit={() => createCategory()}
          className=""
        >
          <input
            ref={inputRef}
            type="text"
            id=""
            name=""
            onChange={(e) => changeInputValue(e.target.value)}
            value={inputValue}
            className={(inputValue.length>=19? "text-red-500 ":"")+
              (isDark ? "border-slate-100" : "border-slate-300 ") +
              " border border-solid  rounded-2xl h-9 px-4 w-2/3 ms-3"
            }
            maxLength={19}
          />
        </form>
        <button className="absolute right-1/3" onClick={() => modeChange(false)}>
          X
        </button>
      </div>
    );
  };

  // 드래그로 좌우 스크롤 할 수 있게
  const ref =
    useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
  const { events } = useDraggable(ref); 
  return (
    <>
      <div className="flex flex-row m-3 items-center py-5 static z-20 w-full md:w-full">
        <div className={editMode ? "hidden" : "h-9 "}>
          <BackButton />
        </div>
        <div className=" flex flex-row  whitespace-nowrap  overflow-scroll scrollbar-hide ">
          <div
            className="flex max-w-xl space-x-3 overflow-x-scroll scrollbar-hide"
            {...events}
            ref={ref}
          >
            {categories.map((category) =>
              editMode ? (
                <CategorySingleEditTab
                  tempCategory={category}
                  canEdit={canEdit}
                  setEditMode={setEditMode}
                />
              ) : (
                <CategorySingleTab 
                tempCategory={category}
                canEdit={canEdit} />
              )
            )}
          </div>

          {canEdit && !editMode ? (
            createMode ? (
              <CreateCategorySection />
            ) : (
              <PlusButton />
            )
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};

export default CategoryTab;
