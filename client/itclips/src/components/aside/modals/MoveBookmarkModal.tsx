// DeleteBookmarkListModal.tsx 는 AsideBookmarkList.tsx 에서 더보기 메뉴의 '삭제하기' 버튼을 눌렀을 때 출력되는 컴포넌트

import React from "react";
import { FC, useState } from "react";
import { IoClose } from "react-icons/io5";
import mainStore from "../../../stores/mainStore";
import axios from "axios";

interface BookmarkType {
  id: number;
  category: string;
  title: string;
  url: string;
  tags: {
    title: string;
  }[];

  content: string;
  isLiked: boolean;
  likeCount: number;
}
interface BookmarksType extends Array<BookmarkType> {}

interface Move {
  editBookmarks: BookmarksType;
  changeEditBookmarksIndex: React.Dispatch<React.SetStateAction<number[]>>;
  tabModal: React.Dispatch<React.SetStateAction<boolean>>;
  toggleMode: React.Dispatch<React.SetStateAction<boolean>>;
  // 이동 or 추가로 북마크 삭제까지 할지말지 결정
  whatMenu: string;
}

const MoveBookmarkModal: FC<Move> = ({
  editBookmarks,
  changeEditBookmarksIndex,
  tabModal,
  toggleMode,
  whatMenu,
}) => {
  // 편의상 하나만 했지만, 나중에 내 북리, 그룹 북리 다 가져와서 선택해서 넣게
  interface CategoryType {
    categoryId: number;
    categoryName: string;
  }
  interface CategoriesTypes extends Array<CategoryType> {}

  const lists = mainStore((state) => state.lists);

  const [clickedIndex, changeClickedIndex] = useState<number>(0);

  /// 최종적으로 북마크들 이동시킬 카테고리
  const [selectCategory, setSelectCategory] = useState<number>(0);
  const [selectListId, setSelectListId] = useState<number>();

  function endMoving(): any {
    if (selectCategory === 0) {
      window.alert("북마크를 이동할 리스트와 카테고리를 선택해 주세요");
    } else {
      // moveBookmarks.map((bookmark) => )
      tabModal(false);
      toggleMode(false);
    }
    changeEditBookmarksIndex([]);
    ///여기에 api호출로 이동
    /// 추가하고 삭제하던 or 복사해서 추가만 하던 그때그때마다
    /// 옮길 북마크들은 editbookmarks에 있고, 옮길 리스트id 랑 selectCategory로 post
    editBookmarks.map((editBookmark) =>
      axios.post(`${}/bookmark/add/${selectListId}/${selectCategory}`, editBookmark)
    );

    if (whatMenu === "이동") {
      editBookmarks.map((editBookmark) =>
        axios.delete(`/bookmark/delete/${editBookmark.id}`)
      );
    }
  }

  //임시값
  const tempCategories: CategoriesTypes = [
    {
      categoryId: 1,
      categoryName: "카테고리1",
    },
    {
      categoryId: 2,
      categoryName: "카테고리2",
    },
  ];

  interface Props {
    list: {
      id: number;
      image: string;
      bookmarks: object[];
      title: string;
      tags: string[];
      description: string;
      likeCount: number;
      isCompleted: boolean;
    };
    clickedIndex: number;
    changeClickedIndex: React.Dispatch<React.SetStateAction<number>>;
    selectCategory: number;
    setSelectCategory: React.Dispatch<React.SetStateAction<number>>;
  }

  const SingleList: FC<Props> = ({
    list,
    clickedIndex,
    changeClickedIndex,
    selectCategory,
    setSelectCategory,
  }): any => {
    // const [categories, changeCategories] = useState<CategoriesTypes>([]);

    const [isOpen, toggleOpen] = useState(
      clickedIndex === list.id ? true : false
    );

    const clickEvent = async (listId: number): Promise<void> => {
      // 임시 카테고리들
      setSelectListId(listId);

      changeClickedIndex(listId);
      if (clickedIndex === listId) {
        toggleOpen(!isOpen);
      } else {
        toggleOpen(true);
        setSelectCategory(0);
      }
    };

    return (
      <div className="flex flex-col w-11/12">
        <div
          className={
            (isOpen ? "bg-sky-200" : "") +
            " flex flex-row justify-start h-20  border-b border-slate-300 hover:bg-sky-200 hover:cursor-pointer"
          }
          onClick={() => clickEvent(list.id)}
        >
          <div className="h-20 w-1/5 overflow-hidden">
            <img src={list.image} alt="#" className="object-cover" />
          </div>
          <h4 className="flex flex-row items-center w-4/5 ps-5">
            {list.title}
          </h4>
        </div>

        {/* 여기에 눌렀을때 나오는 세부 카테고리들 */}
        <div className={isOpen ? "" : "hidden"}>
          {list.id === clickedIndex ? (
            tempCategories.map((category: CategoryType) => (
              <div className="flex flex-row">
                <div className="w-1/5"></div>
                <div
                  className={
                    (selectCategory === category.categoryId
                      ? "bg-slate-300"
                      : "") +
                    " w-4/5 ps-5 py-2 hover:bg-slate-200 hover:cursor-pointer"
                  }
                  onClick={() => setSelectCategory(category.categoryId)}
                >
                  {" "}
                  {category.categoryName}
                </div>
              </div>
            ))
          ) : (
            <></>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        {/* 닫기 버튼 */}
        <div className="flex flex-row justify-end">
          <button onClick={() => tabModal(false)}>
            <IoClose size={20} />
          </button>
        </div>
        {/* 모달 타이틀 */}
        <h3 className="font-bold text-xl flex flex-row justify-center">
          {whatMenu === "추가" ? "추가할 위치 선택" : "이동할 위치 선택"}
        </h3>

        <div className="flex flex-col justify-start items-start overflow-y-scroll h-72 mt-5">
          {lists.map((list) => (
            <SingleList
              list={list}
              clickedIndex={clickedIndex}
              changeClickedIndex={changeClickedIndex}
              selectCategory={selectCategory}
              setSelectCategory={setSelectCategory}
            />
          ))}
        </div>

        {/* 완료 버튼 */}
        <div className="flex flex-row justify-end">
          <button
            className="bg-sky-500 text-slate-100 rounded-2xl py-2 px-4 font-bold hover:bg-sky-600 me-7"
            onClick={endMoving}
          >
            완료
          </button>
        </div>
      </div>
    </div>
  );
};

export default MoveBookmarkModal;
