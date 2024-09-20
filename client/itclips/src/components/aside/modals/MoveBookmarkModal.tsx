// DeleteBookmarkListModal.tsx 는 AsideBookmarkList.tsx 에서 더보기 메뉴의 '삭제하기' 버튼을 눌렀을 때 출력되는 컴포넌트

import React, { useEffect } from "react";
import { FC, useState } from "react";
import { IoClose } from "react-icons/io5";
import mainStore from "../../../stores/mainStore";
import axios from "axios";
import { API_BASE_URL } from "../../../config";
import type { BookmarkType } from "../../../types/BookmarkType";
import { useParams } from "react-router-dom";
import type { CategoryType } from "../../../types/BookmarkListType";
import { authStore } from "../../../stores/authStore";
import type { BookmarkListSumType } from "../../../types/BookmarkListType";
import toastStore from "../../../stores/toastStore";
import noImg from "../../../assets/images/noImg.gif"
interface Move {
  editBookmarks: BookmarkType[];
  changeEditBookmarksIndex: React.Dispatch<React.SetStateAction<number[]>>;
  tabModal: React.Dispatch<React.SetStateAction<boolean>>;
  toggleMode: React.Dispatch<React.SetStateAction<boolean>>;
  changeEditBookmarks?:React.Dispatch<React.SetStateAction<BookmarkType[]>>;
  // 이동 or 추가로 북마크 삭제까지 할지말지 결정
  whatMenu: string;
}

const MoveBookmarkModal: FC<Move> = ({
  editBookmarks,
  changeEditBookmarksIndex,
  tabModal,
  toggleMode,
  whatMenu,
  changeEditBookmarks,
}) => {
  // 편의상 하나만 했지만, 나중에 내 북리, 그룹 북리 다 가져와서 선택해서 넣게

  const params = useParams();
  const { userId, token } = authStore();

  const [clickedIndex, changeClickedIndex] = useState<number>(0);
  const {setIsBookmarkListChange} = mainStore()
  /// 최종적으로 북마크들 이동시킬 카테고리
  const [selectCategory, setSelectCategory] = useState<number>(0);
  const [selectListId, setSelectListId] = useState<number>();
  const [tempCategories, setTempCategories] = useState<CategoryType[]>([]);
  const [lists, setLists] = useState<BookmarkListSumType[]>([]);

  const {globalNotification, setGlobalNotification} = toastStore()
  function endMoving(): any {
    tabModal(false);
    toggleMode(false);
    // 카테고리 선택 안했으면 그냥 보내기
    if (selectCategory === 0) {
      /// 카테고리 선택했을떄
      editBookmarks.map((editBookmark) =>
        axios.post(
          `${API_BASE_URL}/api/bookmark/add/${selectListId}?userId=${userId}`,
          {
            url:editBookmark.url,
            title:editBookmark.title,
            tags:editBookmark.tags,
            content:editBookmark.content,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }).then(()=>{
          setIsBookmarkListChange(true)
        })
      );

      if (whatMenu === "이동") {
        editBookmarks.map((editBookmark) =>
          axios.delete(`${API_BASE_URL}/api/bookmark/delete/${editBookmark.id}?userId=${userId}`,{
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }).then(()=>{
            setIsBookmarkListChange(true)
          })
        );
        changeEditBookmarksIndex([])
        if(changeEditBookmarks){
        changeEditBookmarks([])}
      }
      const toastText = whatMenu==='이동'? '이동': '추가'
        setGlobalNotification({
          message: `북마크 ${toastText} 완료`,
          type: "success",
        });
    } else {
      /// 카테고리 선택했을떄
      editBookmarks.map((editBookmark) =>
        axios({
          method:'post',
          url:`${API_BASE_URL}/api/bookmark/add/${selectListId}/${selectCategory}?userId=${userId}`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data:{
            url:editBookmark.url,
            title:editBookmark.title,
            tags:editBookmark.tags,
            content:editBookmark.content,
          }
        }).then(()=>{
          setIsBookmarkListChange(true)
        })
      );

      if (whatMenu === "이동") {
        editBookmarks.map((editBookmark) =>
          axios.delete(`${API_BASE_URL}/api/bookmark/delete/${editBookmark.id}?userId=${userId}`,{
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }).then(()=>{
            setIsBookmarkListChange(true)
          })
        );
        changeEditBookmarksIndex([])
        if(changeEditBookmarks){
        changeEditBookmarks([])}
      }
      const toastText = whatMenu==='이동'? '이동': '추가'
        setGlobalNotification({
          message: `북마크 ${toastText} 완료`,
          type: "success",
        });
    }
  }

  // 유저가 가진 리스트들  lists
  useEffect(() => {
    async function fetchData() {
      axios({
        method: "get",
        url: `${API_BASE_URL}/api/list/personal/${userId}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          viewerId: userId,
        },
      })
        .then((res) => {
          setLists(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
    fetchData();
  }, []);

  // 리스트 눌렀을때, 속한 임시 카테고리  tempcategories
  useEffect(() => {
    setTempCategories([])
    async function fetchData() {
      axios({
        method: "get",
        url: `${API_BASE_URL}/api/list/${selectListId}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          userId: userId,
        },
      })
        .then((res) => {
          setTempCategories(res.data.categories);
        })
        .catch((err) => {
          console.error(err);
        });
    }
    fetchData();
  }, [selectListId]);

  interface Props {
    list: BookmarkListSumType;
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

    const [isOpen, toggleOpen] = useState(
      clickedIndex === list.id ? true : false
    );

    const clickEvent = async (listId: number): Promise<void> => {
      
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
      <div className="flex flex-col w-11/12 ">
        <div
          className={
            (isOpen ? "bg-sky-200" : "") +
            " flex flex-row justify-start h-20  border-b border-slate-300 hover:bg-sky-100 hover:cursor-pointer rounded-s-xl"
          }
          onClick={() => clickEvent(list.id)}
        >
          <div className="h-20 w-20 overflow-hidden rounded-xl ">
            <img src={list.image==="default" ? require(`../../../assets/images/noContent${list.id % 6}.png`) : list.image }  className="object-cover h-full w-full rounded-xl " />
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
