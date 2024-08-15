import CategoryTab from "../components/main/CategoryTab";
import Bookmark from "../components/main/Bookmark";
import AsideBookmarkList from "../components/aside/AsideBookmarkList";
import { asideStore } from "../stores/asideStore";
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
import type { BookmarkListDetailType } from "../types/BookmarkListType";
import { useParams } from "react-router-dom";
import { API_BASE_URL } from "../config";
import { authStore } from "../stores/authStore";
import darkModeStore from "../stores/darkModeStore";
import mainStore from "../stores/mainStore";
import NoContent from "./ProfileView/NoContent";
import toastStore from "../stores/toastStore";
import DeleteContentModal from "../components/aside/modals/DeleteContentModal";
import AsideMobileContent from "../components/aside/AsideBookmarkList(Mobile)";
import BookmarkListEditModal from "../components/aside/modals/BookmarkListEditModal";
import bookmarkListModalStore from "../stores/bookmarkListEditModalStore";

const MyBookmark = () => {
  const params = useParams();
  const tempListId = params.bookmarklistId;
  const { isBookmarkListChange, setIsBookmarkListChange } = mainStore();
  const {isDeleteCategoryModalOpen,setIsDeleteCategoryModalOpen, deleteCategory, setDeleteCategory} = mainTabStore()

  let listId = 0;
  if (tempListId) {
    listId = parseInt(tempListId);
  }

  const { userId, token } = authStore();
  
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
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  const [noContent, setNoContent] = useState(
    <div className="w-full flex flex-row justify-center">
      <span className="loading loading-spinner loading-lg text-sky-500"></span>
    </div>
  );

  // 리스트 변경 모달 띄울 용도
  const {isEditModalOpen,setIsBookmarkListEditModalOpen,bookmarkListId} = bookmarkListModalStore()

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
          setNoContent(<NoContent content={"북마크"} />);
        })
        .catch((err) => {
          console.error(err);
          // 비공개인 리스트에 접근했을때
          if (err.response?.status === 401 || err.response?.status === 403) {
            setCanView(false);
          }
        });
    }
    fetchData();
    window.scrollTo(0,0)
  }, [isBookmarkListChange]);

  // 카테고리 삭제용 모달
  const DeleteCheckModal = (): any => {

    function deleteCat(): void {
      axios({
        method: "delete",
        url: `${API_BASE_URL}/api/category/delete/${deleteCategory}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          userId: userId,
        },
      })
        .then((res) => {
          setIsBookmarkListChange(true);
          setDeleteCategory(0)
        })
        .catch((err) => {
          console.error(err);
        });
    }

    return (
      <div className="modal modal-open fixed z-50">
        <div className="modal-box ">
          <h3 className="font-bold text-lg">삭제하시겠습니까?</h3>
          <div className="modal-action">
            <button
              className="btn bg-red-500 text-slate-100 hover:bg-red-700"
              onClick={() => {
                deleteCat();
                setIsDeleteCategoryModalOpen(false);
              }}
            >
              확인
            </button>
            <button
              className="btn"
              onClick={() => {
                setIsDeleteCategoryModalOpen(false);
              }}
            >
              취소
            </button>
          </div>
        </div>
      </div>
    );
  };


  return (
    <>
      {canView ? (
        <div id="Body" className="grid grid-cols-12 gap-5">
          {/* aside 자리 */}
          <div
            id="aside"
            className="md:col-start-2 md:col-span-3 md:pe-10 col-start-2 col-span-10"
          >
            <div className="hidden md:block sticky top-16 z-20">
              {bookmarkList ? (
                <AsideBookmarkList bookmarkList={bookmarkList} />
              ) : (
                <></>
              )}
            </div>
            <div className="static md:hidden">
              {bookmarkList ? (
                <AsideMobileContent data={bookmarkList} />
              ) : (
                <></>
              )}
            </div>
          </div>

          {/* main자리 */}
          <div
            id="Main"
            className="md:col-start-5 md:col-span-7 col-start-2 col-span-10 gap-4"
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
                  <div className="sticky right-10 flex flex-row z-30">
                  <button
                    className={
                      "bg-red-500  text-slate-100 border border-red-500 rounded-2xl  px-4 font-bold hover:bg-red-600 hover:text-white h-9 min-w-24 "
                    }
                    disabled={editBookmarks.length !== 0 ? false : true}
                    onClick={() =>
                      setIsDeleteModalOpen(true)
                    }
                  >
                    삭제
                  </button>

                  <button
                    className={
                      (editBookmarks.length === 0
                        ? "bg-white border text-sky-500"
                        : "bg-sky-500  text-slate-100 border") +
                      "  border-sky-500 rounded-2xl  px-4 font-bold hover:bg-sky-600 hover:text-white h-9 min-w-24 ms-2"
                    }
                    onClick={() =>
                      editBookmarks.length !== 0 ? tabEditModal(true) : ""
                    }
                  >
                    이동 | {editBookmarks.length}
                  </button>
                  </div>
                </div>
              ) : bookmarkList ? (
                <div className="static z-50 ">
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
            <div className="mb-12">
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
                    canEdit={canEdit}
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
          changeEditBookmarks={changeEditBookmarks}
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
      {/* 북마크 삭제 모달 */}
        {isDeleteModalOpen && (
        <DeleteContentModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          bookmarks={editBookmarks}
          whatContent="북마크"
          changeEditBookmarks={changeEditBookmarks}
          changeEditBookmarksIndex={changeEditBookmarksIndex}
          toggleMode={setEditMode}
        />
      )}
      {/* 카테고리 삭제 & 북마크 수정 모달 뜨는 위치 */}
      {isDeleteCategoryModalOpen&& <DeleteCheckModal />}
      {isEditModalOpen && <BookmarkListEditModal isOpen={isEditModalOpen} onClose={()=>setIsBookmarkListEditModalOpen(false)} id={bookmarkListId}/>}
    </>
  );
};

export default MyBookmark;
