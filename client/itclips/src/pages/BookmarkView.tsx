import CategoryTab from "../components/main/CategoryTab";
import Bookmark from "../components/main/Bookmark";
import AsideBookmarkList from "../components/aside/AsideBookmarkList";
import { asideStore } from "../stores/asideStore";
import MessageLayout from "../components/aside/MessageLayout";
import mainTabStore from "../stores/mainTabStore";
import { FaEdit } from "react-icons/fa";
import { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import BookmarkEdit from "../components/main/Bookmark(Edit)";
import MoveBookmarkModal from "../components/aside/modals/MoveBookmarkModal";
import axios from "axios";
import AddBookmarkModal from "../components/aside/modals/AddBookmarkModal";
import type { BookmarkType } from "../types/BookmarkType";
import type { CategoryType } from "../types/BookmarkListType";
import type { BookmarkListDetailType } from "../types/BookmarkListType";
import { useParams } from "react-router-dom";
import { API_BASE_URL } from "../config";
import { authStore } from "../stores/authStore";
import darkModeStore from "../stores/darkModeStore";
import { deleteStore } from "../stores/deleteStore";

const MyBookmark = () => {
  const params = useParams();
  const { isDark } = darkModeStore();
  const { deletedBookmark } = deleteStore();
  const tempListId = params.bookmarklistId;

  let listId = 0;
  if (tempListId) {
    listId = parseInt(tempListId);
  }
  const { userId, token } = authStore();
  const isMessageOpen = asideStore((state) => state.isMessageOpen);

  const whatCategory = mainTabStore((state) => state.whatCategory);
  const changeCategory = mainTabStore((state) => state.changeCategory);
  const tempCategories = mainTabStore((state) => state.tempCategories);
  const setTempCategories = mainTabStore((state) => state.setTempCategories);

  // 수정용 북마크들
  const [editBookmarks, changeEditBookmarks] = useState<BookmarkType[]>([]);
  const [editBookmarksIndex, changeEditBookmarksIndex] = useState<number[]>([]);

  const [editMode, setEditMode] = useState(false);
  const [isEditModal, tabEditModal] = useState(false);
  const [isAddModal, tabAddModal] = useState(false);

  // 현재 유저가 편집권한이 있는지(= 현재 리스트의 생성자에 포함되어있는지)
  const [canEdit, setCanEdit] = useState(false);

  // 메인으로 쓸것들
  const [bookmarkList, setBookmarkList] = useState<BookmarkListDetailType>();
  const [filterdBookmarks, setFilterdBookmarks] = useState<BookmarkType[]>([]);

  // 북마크 추가 버튼 누를 시, 임시로 잡아줬던 whatCategory의 id값을 갱신해줘야됨
  const addBookmark = () => {
    // 임시의 카테고리면 id가 필요하니까 받아오는 거
    if (whatCategory.categoryId === 0) {
      axios({
        method: "get",
        url: `${API_BASE_URL}/api/list/${listId}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          userId: userId,
        },
      })
        .then((res) => {
          const newCatId = res.data.categories.filter(
            (cat: CategoryType) =>
              cat.categoryName === whatCategory.categoryName
          )[0].categoryId;
          changeCategory({
            categoryId: newCatId,
            categoryName: whatCategory.categoryName,
          });
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  // onMount될때 리스트 불러오기
  useEffect(() => {
    async function fetchData() {
      axios({
        method: "get",
        url: `${API_BASE_URL}/api/list/${listId}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          userId: userId,
        },
      })
        .then((res) => {
          changeCategory({ categoryId: 0, categoryName: "" });
          setBookmarkList(res.data);
          setFilterdBookmarks(res.data.bookmarks);
          setTempCategories(res.data.categories);

          res.data.users.map((user: { id: number; nickName: string }) =>
            user.id === userId ? setCanEdit(true) : <></>
          );
        })
        .catch((err) => {
          console.error(err);
        });
    }
    fetchData();
  }, []);


  // 카테고리 탭 바뀔때 마다 보여줄 북마크들 필터
  // useEffect(() => {
  //   async function fetchData() {
  //     if (bookmarkList) {
  //       if (whatCategory.categoryName === "") {
  //         setFilterdBookmarks(
  //           bookmarkList.bookmarks.filter(
  //             (bookmark) => !deletedBookmark.includes(bookmark.id)
  //           )
  //         );
  //       } else {
  //         setFilterdBookmarks(
  //           bookmarkList.bookmarks.filter(
  //             (bookmark) =>
  //               !deletedBookmark.includes(bookmark.id) &&
  //               bookmark.category === whatCategory.categoryName
  //           )
  //         );
  //       }
  //     }
  //   }
  //   fetchData();
  // }, [whatCategory.categoryName]);

  return (
    <>
      <div id="Body" className="grid grid-cols-12 gap-5">
        {/* aside 자리 */}
        <div id="aside" className="xl:col-start-2 xl:col-span-3 hidden xl:block">
          <div className="static">
            {bookmarkList ? (
              <AsideBookmarkList bookmarkList={bookmarkList} />
            ) : (
              <></>
            )}
          </div>
        </div>

        {/* main자리 */}
        <div
          id="Main"
          className="xl:col-start-5 xl:col-span-7 col-start-3 col-span-8 gap-4"
        >
          <div className=" bg-base-100 fixed z-10 w-7/12">
            {/* 상단바 */}
            {editMode ? (
              <div className="flex flex-row justify-end pe-5 my-5  ">
                <button
                  className={
                    (editBookmarks.length === 0
                      ? "bg-white border text-sky-500"
                      : "bg-sky-500  text-slate-100 border") +
                    "  border-sky-500 rounded-2xl py-2 px-4 font-bold hover:bg-sky-600 hover:text-white"
                  }
                  onClick={() =>
                    editBookmarks.length !== 0 ? tabEditModal(true) : ""
                  }
                >
                  이동 | {editBookmarks.length}
                </button>
              </div>
            ) : bookmarkList ? (
              <div className="static z-50">
                <CategoryTab listId={bookmarkList.id} />
              </div>
            ) : (
              <></>
            )}
          </div>
          {/* 북마크들 */}

          <div className="absolute top-24 w-7/12">
            {filterdBookmarks.map((bookmark) =>
              editMode ? (
                <BookmarkEdit
                  bookmark={bookmark}
                  editBookmarks={editBookmarks}
                  changeEditBookmarks={changeEditBookmarks}
                  editBookmarksIndex={editBookmarksIndex}
                  changeEditBookmarksIndex={changeEditBookmarksIndex}
                />
              ) : (
                <Bookmark
                  bookmark={bookmark}
                  editBookmarks={editBookmarks}
                  changeEditBookmarks={changeEditBookmarks}
                  editBookmarksIndex={editBookmarksIndex}
                  changeEditBookmarksIndex={changeEditBookmarksIndex}
                />
              )
            )}
          </div>

          {/* 에디터 모드 전환 버튼 */}
          <div className="fixed bottom-10 right-10">
            {editMode ? (
              <div className="flex flex-col ">
                <FaPlus
                  size={50}
                  onClick={() => {
                    tabAddModal(true);
                    addBookmark();
                  }}
                  className="hover:cursor-pointer hover:text-sky-600 text-sky-400"
                />{" "}
                <IoClose
                  size={50}
                  onClick={() => {
                    setEditMode(false);
                    changeEditBookmarks([]);
                    changeEditBookmarksIndex([]);
                  }}
                  className="hover:cursor-pointer hover:text-slate-500"
                />
              </div>
            ) : canEdit ? (
              <FaEdit
                size={50}
                onClick={() => setEditMode(true)}
                className="hover:cursor-pointer hover:text-sky-600"
              />
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>

      {/* 북마크 이동 모달 */}
      {isEditModal && (
        <MoveBookmarkModal
          editBookmarks={editBookmarks}
          tabModal={tabEditModal}
          toggleMode={setEditMode}
          changeEditBookmarksIndex={changeEditBookmarksIndex}
          whatMenu={"이동"}
        />
      )}
      {/* 북마크 추가 모달 */}
      {isAddModal && (
        <AddBookmarkModal
          tabModal={tabAddModal}
          toggleMode={setEditMode}
          listId={listId}
        />
      )}
    </>
  );
};

export default MyBookmark;
