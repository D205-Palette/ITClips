import SearchBar from "../components/main/MainSearchBar";
import CategoryTab from "../components/main/CategoryTab";
import mainStore from "../stores/mainStore";
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
import AddBookmarkModal from "../components/aside/modals/AddBookmarkListModal";
import type { BookmarkType } from "../types/BookmarkType";
import type { CategoryType } from "../types/BookmarkListType";
import type { BookmarkListDetailType } from "../types/BookmarkListType";
import { useParams } from "react-router-dom";
import { API_BASE_URL } from "../config";
import { authStore } from "../stores/authStore";
/// params.bookmarklistId로 axios 호출해서 리스트 상세정보 받아오기. 거기서 북마크들만

const MyBookmark = () => {
  const params = useParams();

  const tempListId = params.bookmarklistId;
  let listId = 0;
  if (tempListId) {
    listId = parseInt(tempListId);
  }

  const isMessageOpen = asideStore((state) => state.isMessageOpen);
  const whatCategory = mainTabStore((state) => state.whatCategory);

  const [editMode, toggleMode] = useState(false);

  const [editBookmarks, changeEditBookmarks] = useState<BookmarkType[]>([]);
  const [editBookmarksIndex, changeEditBookmarksIndex] = useState<number[]>([]);

  const [isEditModal, tabEditModal] = useState(false);
  const [isAddModal, tabAddModal] = useState(false);
  const { userId, token } = authStore();

  const [tempCategories, setTempCategories] = useState<CategoryType[]>([]);
  const [bookmarkList, setBookmarkList] = useState<BookmarkListDetailType>();

  useEffect(() => {
    async function fetchData() {
      axios({
        method: "get",
        url: `${API_BASE_URL}/api/list/${tempListId}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          userId: userId,
        },
      })
        .then((res) => {
          console.log(res);
          setBookmarkList(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
    fetchData();
  }, []);

  //보여줄 필터링 된 북마크들
  const filteredBookmarks =
    whatCategory.categoryName === ""
      ? bookmarkList?.bookmarks
      : bookmarkList?.bookmarks.filter(
          (bookmark) => bookmark.category === whatCategory.categoryName
        );

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
          <div className="fixed">
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
          {/* 상단바 */}
          {editMode ? (
            <div className="flex flex-row justify-end pe-5 my-5">
              <button
                className={
                  (editBookmarksIndex.length === 0
                    ? "bg-white border text-sky-500"
                    : "bg-sky-500  text-slate-100 border") +
                  "  border-sky-500 rounded-2xl py-2 px-4 font-bold hover:bg-sky-600 hover:text-white"
                }
                onClick={() =>
                  editBookmarksIndex.length !== 0 ? tabEditModal(true) : ""
                }
              >
                이동 | {editBookmarksIndex.length}
              </button>
            </div>
          ) : (bookmarkList ? 
            <CategoryTab categories={bookmarkList.categories} listId={bookmarkList.id} />
           : 
            <></>
          )}

          {/* 북마크들 */}
          {filteredBookmarks ? (
            filteredBookmarks.map((bookmark) =>
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

          {/* 에디터 모드 전환 버튼 */}
          <div className="fixed bottom-10 right-10">
            {editMode ? (
              <div className="flex flex-col ">
                <FaPlus
                  size={50}
                  onClick={() =>
                    whatCategory.categoryName === ""
                      ? window.alert("카테고리를 선택해주세요")
                      : tabAddModal(true)
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
            ) : (
              <FaEdit
                size={50}
                onClick={() => toggleMode(true)}
                className="hover:cursor-pointer hover:text-sky-600"
              />
            )}
          </div>
        </div>
      </div>

      {isEditModal && (
        <MoveBookmarkModal
          editBookmarks={editBookmarks}
          tabModal={tabEditModal}
          toggleMode={toggleMode}
          changeEditBookmarksIndex={changeEditBookmarksIndex}
          whatMenu={"이동"}
        />
      )}
      {isAddModal && (
        <AddBookmarkModal
          moveBookmarks={editBookmarksIndex}
          tabModal={tabAddModal}
          toggleMode={toggleMode}
          listId={listId}
        />
      )}
    </>
  );
};

export default MyBookmark;
