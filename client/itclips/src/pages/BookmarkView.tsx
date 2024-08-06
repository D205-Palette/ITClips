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
  const {isDark} = darkModeStore()
  const {deletedBookmark} = deleteStore()
  const tempListId = params.bookmarklistId;

  let listId = 0;
  if (tempListId) {
    listId = parseInt(tempListId);
  }

  const isMessageOpen = asideStore((state) => state.isMessageOpen);
  const whatCategory = mainTabStore((state) => state.whatCategory);
  const changeCategory = mainTabStore((state)=>state.changeCategory)
  const tempCategories = mainTabStore((state) => state.tempCategories)
  const setTempCategories = mainTabStore((state)=>state.setTempCategories)
  const [editMode, toggleMode] = useState(false);

  const [editBookmarks, changeEditBookmarks] = useState<BookmarkType[]>([]);
  const [editBookmarksIndex, changeEditBookmarksIndex] = useState<number[]>([]);

  const [isEditModal, tabEditModal] = useState(false);
  const [isAddModal, tabAddModal] = useState(false);
  const { userId, token } = authStore();

  const [canEdit, setCanEdit] = useState(false)


  // 메인으로 쓸것들
  const [bookmarkList, setBookmarkList] = useState<BookmarkListDetailType>();
  const [bookmarks, setBookmarks] = useState<BookmarkType[]>([])

  // 북마크 추가 버튼 누를 시, 임시로 잡아줬던 whatCategory의 id값을 갱신해줘야됨 
  const addBookmark =  () => {
    // 임시의 카테고리면 id가 필요하니까 받아오는 거
    if(whatCategory.categoryId===0){
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
        const newCatId = res.data.categories.filter((cat:CategoryType)=>cat.categoryName===whatCategory.categoryName)[0].categoryId
        changeCategory({categoryId:newCatId, categoryName:whatCategory.categoryName})
      })
      .catch((err) => {
        console.error(err);
      });
    }
  }

  // 북마크들
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
          setBookmarkList(res.data);
          setBookmarks(res.data.bookmarks)
          setTempCategories(res.data.categories)       
          res.data.users.map((user:{id:number,nickName:string})=>(user.id===userId? setCanEdit(true):''))
        })
        .catch((err) => {
          console.error(err);
        });
    }
    fetchData();
  }, []);

  const filterdBookmarks = bookmarks.filter((bookmark) => !deletedBookmark.includes(bookmark.id))
  return (
    <>
      <div id="Body" className="grid grid-cols-12 gap-5">
        {/* aside 자리 */}
        <div
          id="aside"
          className="xl:col-start-2 xl:col-span-3 hidden xl:block "
        >
          {/* 메세지 뜨는 위치 */}
          <div id="aside" className="absolute col-start-2 col-span-3 z-50">
            <div className="fixed">{isMessageOpen && <MessageLayout />}</div>
          </div>
          <div className="fixed z-50">
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
          <div className={(isDark? "": "bg-white") + " fixed z-10 w-full"} >
          {/* 상단바 */}
          {editMode ? (
            <div className="flex flex-row justify-end pe-5 my-5">
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
          ) : (bookmarkList ? 
            <CategoryTab listId={bookmarkList.id} />
           : 
            <></>
          )}
</div>
          {/* 북마크들 */}
          <div className="absolute top-24 w-7/12">
          {filterdBookmarks ? (
            filterdBookmarks.map((bookmark) =>
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
            )
          ) : (
            <></>
          )}
          </div>

          {/* 에디터 모드 전환 버튼 */}
          <div className="fixed bottom-10 right-10">
            {editMode ? (
              <div className="flex flex-col ">
                <FaPlus
                  size={50}
                  onClick={() =>
                  { tabAddModal(true);addBookmark() }

                  }
                  className="hover:cursor-pointer hover:text-sky-600 text-sky-400"
                />{" "}
                <IoClose
                  size={50}
                  onClick={() => {
                    toggleMode(false);
                    changeEditBookmarks([]);
                    changeEditBookmarksIndex([]);
                  }}
                  className="hover:cursor-pointer hover:text-slate-500"
                />
              </div>
            ) : ( canEdit ? 
              <FaEdit
                size={50}
                onClick={() => toggleMode(true)}
                className="hover:cursor-pointer hover:text-sky-600"
              /> : <></>
            )}
          </div>
        </div>
      </div>

      {/* 북마크 이동 모달 */}
      {isEditModal && (
        <MoveBookmarkModal
          editBookmarks={editBookmarks}
          tabModal={tabEditModal}
          toggleMode={toggleMode}
          changeEditBookmarksIndex={changeEditBookmarksIndex}
          whatMenu={"이동"}
        />
      )}
      {/* 북마크 추가 모달 */}
      {isAddModal && (
        <AddBookmarkModal
          tabModal={tabAddModal}
          toggleMode={toggleMode}
          listId={listId}
        />
      )}
    </>
  );
};

export default MyBookmark;
