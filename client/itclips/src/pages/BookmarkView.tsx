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
import mainStore from "../stores/mainStore";
import NoContent from "./ProfileView/NoContent";

const MyBookmark = () => {
  const params = useParams();
  const { isDark } = darkModeStore();
  const tempListId = params.bookmarklistId;
  const { isBookmarkListChange, setIsBookmarkListChange } = mainStore();

  let listId = 0;
  if (tempListId) {
    listId = parseInt(tempListId);
  }

  const { userId, token } = authStore();
  const isMessageOpen = asideStore((state) => state.isMessageOpen);

  const whatCategory = mainTabStore((state) => state.whatCategory);
  const changeCategory = mainTabStore((state) => state.changeCategory);
 

  // 수정&이동용 북마크 정보들
  const [editBookmarks, changeEditBookmarks] = useState<BookmarkType[]>([]);
  const [editBookmarksIndex, changeEditBookmarksIndex] = useState<number[]>([]);

  // 에디트 모드 전환용
  const [editMode, setEditMode] = useState(false);
  const [isEditModal, tabEditModal] = useState(false);
  const [isAddModal, tabAddModal] = useState(false);

  // 현재 유저가 편집권한이 있는지(= 현재 리스트의 생성자에 포함되어있는지)
  const [canEdit, setCanEdit] = useState(false);

  // 메인으로 쓸것들
  const [bookmarkList, setBookmarkList] = useState<BookmarkListDetailType>();
  const [filterdBookmarks, setFilterdBookmarks] = useState<BookmarkType[]>([]);

  const [canView, setCanView] = useState(true);

  const [noContent, setNoContent] = useState(<div className="w-full flex flex-row justify-center"><span className="loading loading-spinner loading-lg text-sky-500"></span></div>)
 
  // 북마크 리스트 변경될때마다 리스트 불러오기

  
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


          res.data.users.map((user: { id: number; nickName: string }) =>
            user.id === userId ? setCanEdit(true) : <></>
          );
          setIsBookmarkListChange(false);
          setNoContent(  <NoContent content={"북마크"} />)
        })
        .catch((err) => {
          console.error(err);
          // 비공개인 리스트에 접근했을때
          console.log(err)
          if (err.response?.status === 401) {
            setCanView(false);
          }
        });
    }
    fetchData();
  }, [isBookmarkListChange]);

  return (
    <>
      {canView ? (
        <div id="Body" className="grid grid-cols-12 gap-5">
          {/* aside 자리 */}
          <div
            id="aside"
            className="xl:col-start-2 xl:col-span-3 hidden xl:block"
          >
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
            className="xl:col-start-5 xl:col-span-7 lg:col-start-3 lg:col-span-8 col-start-2 col-span-10 gap-4"
          >
            <div className="sticky top-16 bg-base-100 z-10">
              {/* 상단바 */}
              {editMode ? (
                <div className="flex flex-row justify-between pe-5 items-center ">
                  <CategoryTab
                    categories={bookmarkList?.categories!}
                    listId={bookmarkList?.id!}
                    canEdit={canEdit}
                    editMode={editMode}
                    setEditMode={setEditMode}
                  />
                  <button
                    className={
                      (editBookmarks.length === 0
                        ? "bg-white border text-sky-500"
                        : "bg-sky-500  text-slate-100 border") +
                      "  border-sky-500 rounded-2xl  px-4 font-bold hover:bg-sky-600 hover:text-white h-9 "
                    }
                    onClick={() =>
                      editBookmarks.length !== 0 ? tabEditModal(true) : ""
                    }
                  >
                    이동 | {editBookmarks.length}
                  </button>
                </div>
              ) : bookmarkList ? (
                <div className="static z-50 max-">
                  <CategoryTab
                    categories={bookmarkList.categories}
                    listId={bookmarkList.id}
                    canEdit={canEdit}
                    editMode={editMode}
                    setEditMode={setEditMode}
                  />
                </div>
              ) : (
                <></>
              )}
            </div>
            {/* 북마크들 */}

            <div className="">
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

          </div>
          
            {/* 에디터 모드 전환 버튼 */}
            <div className="md:flex justify-end fixed bottom-24 right-16 hidden">
              {editMode ? (
                <div className="flex flex-col ">
                  <FaPlus
                    size={50}
                    onClick={() => {
                      tabAddModal(true);
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
      ) : (
        <NoContent content={"비공개리스트"} />
      )}

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
