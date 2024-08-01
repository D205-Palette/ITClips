import SearchBar from "../components/main/MainSearchBar";
import CategoryTab from "../components/main/CategoryTab";
import mainStore from "../stores/mainStore";
import Bookmark from "../components/main/Bookmark";
import AsideBookmarkList from "../components/aside/AsideBookmarkList";
import { asideStore } from "../stores/asideStore";
import MessageLayout from "../components/aside/MessageLayout";
import mainTabStore from "../stores/mainTabStore";
import { FaEdit } from "react-icons/fa";
import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import BookmarkEdit from "../components/main/Bookmark(Edit)";
import MoveBookmarkModal from "../components/aside/modals/MoveBookmarkModal";
import axios from "axios";
import AddBookmarkModal from '../components/aside/modals/AddBookmarkListModal'
import type { BookmarkType } from "../types/BookmarkType";
/// params로 listId 받아온걸로 axios 호출해서 리스트 상세정보 받아오기. 거기서 북마크들만
// interface BookmarkType {

//     id: number;
//     category: string;
//     title: string;
//     url: string;
//     tags: {
//       title: string;
//     }[];

//     content: string;
//     isLiked: boolean;
//     likeCount: number;
  
// }
// interface BookmarksType extends Array<BookmarkType> {}

const MyBookmark = () => {
  const isMessageOpen = asideStore((state) => state.isMessageOpen);
  const whatCategory = mainTabStore((state) => state.whatCategory);

  const [editMode, toggleMode] = useState(false);

  const [editBookmarks, changeEditBookmarks] = useState<BookmarkType[]>([]);
  const [editBookmarksIndex, changeEditBookmarksIndex] = useState<number[]>([]);
  const [isEditModal, tabEditModal] = useState(false);
  
  const [isAddModal, tabAddModal] = useState(false);

  // 임시 북마크들
  const bookmarks: BookmarkType[] = [
    {
      id: 1,
      category: "카테고리1",
      title: "네이버",
      url: "www.naver.com",
      tags: [
        {
          title: "FE",
        },
        {
          title: "JAVA",
        },
      ],
      content: "내용",
      isLiked: false,
      likeCount: 3,
    },
    {
      id: 2,
      category: "카테고리2",
      title: "구글",
      url: "www.google.com",
      tags: [
        {
          title: "BE",
        },
        {
          title: "JAVA",
        },
      ],
      content: "북마크에 관한 설명",
      isLiked: true,
      likeCount: 16,
    },
    {
      id: 3,
      category: "카테고리3",
      title: "유튜브",
      url: "www.youtube.com",
      tags: [
        {
          title: "FE",
        },
        {
          title: "JAVA",
        },
      ],
      content: "내용",
      isLiked: false,
      likeCount: 10,
    },
  ];
  //보여줄 필터링 된 북마크들
  const filteredBookmarks =
    whatCategory === ""
      ? bookmarks
      : bookmarks.filter((bookmark) => bookmark.category === whatCategory);

  // 임시 카테고리들
  const categories = [
    {
      categoryId: 1,
      categoryName: "카테고리1",
    },
    {
      categoryId: 2,
      categoryName: "카테고리2",
    },
    {
      categoryId: 3,
      categoryName: "카테고리3",
    },
  ];

  

  return (
    <>
      <div id="Body" className="grid grid-cols-12 gap-5">
        {/* aside 자리 */}
        <div
          id="aside"
          className="xl:col-start-3 xl:col-span-3 hidden xl:block "
        >
          {/* 메세지 뜨는 위치 */}
          <div id="aside" className="absolute col-start-3 col-span-3 z-50">
            {isMessageOpen && <MessageLayout />}
          </div>
          <div className="fixed">
            <AsideBookmarkList />
          </div>
          {/* 여기에 listId prop으로 내려줘야되나?? */}
          <AsideBookmarkList />
        </div>

        {/* main자리 */}
        <div
          id="Main"
          className="xl:col-start-6 xl:col-span-6 col-start-3 col-span-8 gap-4"
        >
          {/* 상단바 */}
          {editMode ? (
            <div className="flex flex-row justify-end pe-5 my-5">
              <button
                className={(editBookmarksIndex.length===0?"bg-white border text-sky-500":"bg-sky-500  text-slate-100 border") + "  border-sky-500 rounded-2xl py-2 px-4 font-bold hover:bg-sky-600 hover:text-white"}
                onClick={() => (editBookmarksIndex.length!==0? tabEditModal(true) : "")}
              >
                이동 | {editBookmarksIndex.length}
              </button>
            </div>
          ) : (
            <CategoryTab categories={categories} />
          )}

          {/* 북마크들 */}
          {filteredBookmarks.map((bookmark) =>
            editMode ? (
              <BookmarkEdit
                bookmark={bookmark}
                editBookmarks={editBookmarks}
                changeEditBookmarks={changeEditBookmarks}
                editBookmarksIndex={editBookmarksIndex}
                changeEditBookmarksIndex={changeEditBookmarksIndex}
              />
            ) : (
              <Bookmark bookmark={bookmark} />
            )
          )}

          {/* 에디터 모드 전환 버튼 */}
          <div className="fixed bottom-10 right-10">
            {editMode ? (
              <div className="flex flex-col ">
                <FaPlus
                  size={50}
                  onClick={()=>tabAddModal(true)}
                  className="hover:cursor-pointer hover:text-sky-600 text-sky-400"
                />{" "}
                <IoClose
                  size={50}
                  onClick={() => {toggleMode(false); changeEditBookmarks([]); changeEditBookmarksIndex([])}}
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
          changeEditBookmarks={changeEditBookmarks}
          tabModal={tabEditModal}
          toggleMode={toggleMode}
          editBookmarksIndex={editBookmarksIndex}
          changeEditBookmarksIndex={changeEditBookmarksIndex}
        />
      )}
      {isAddModal && (
        <AddBookmarkModal
          moveBookmarks={editBookmarksIndex}
          tabModal={tabAddModal}
          toggleMode={toggleMode}
        />
      )}
    </>
  );
};

export default MyBookmark;
