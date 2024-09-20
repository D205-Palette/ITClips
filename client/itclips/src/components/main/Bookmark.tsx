// 이미지 , 리스트명, 북마크 개수, 태그, 설명, 좋아요 버튼&좋아요 수, 리스트 세부 조작 버튼
import { useState, FC, useEffect } from "react";
import KebabDropdown from "../common/KebabDropdown(Bookmark)";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import darkModeStore from "../../stores/darkModeStore";
import { FaPlus } from "react-icons/fa6";
import type { BookmarkType } from "../../types/BookmarkType";
import axios from "axios";
import { authStore } from "../../stores/authStore";
import { API_BASE_URL } from "../../config";
import EditTag from "./Bookmark(Tag)";
import AIContent from "./Bookmark(AI)";
import mainTabStore from "../../stores/mainTabStore";
import toastStore from "../../stores/toastStore";

interface Props {
  bookmark: BookmarkType;
  editBookmarks: BookmarkType[];
  changeEditBookmarks: React.Dispatch<React.SetStateAction<BookmarkType[]>>;
  editBookmarksIndex: number[];
  changeEditBookmarksIndex: React.Dispatch<React.SetStateAction<number[]>>;
  canEdit: boolean;
}

const Bookmark: FC<Props> = ({
  bookmark,
  editBookmarks,
  changeEditBookmarks,
  editBookmarksIndex,
  changeEditBookmarksIndex,
  canEdit,
}) => {
  const [tempBookmark, editTempBookmark] = useState<BookmarkType>(bookmark);
  const [tempTitle, editTempTitle] = useState<string>(bookmark.title);
  const [tempTags, editTempTags] = useState(bookmark.tags);
  const [tempTag, editTempTag] = useState("");
  const { setGlobalNotification } = toastStore();
  // 북마크 썸네일 불러오기
  const [ogImage, setOgImage] = useState("");

  useEffect(() => {
    setOgImage(
      `https://www.google.com/s2/favicons?sz=64&domain_url=${bookmark.url}`
    );
  });

  const [isLike, toggleLike] = useState(bookmark.isLiked);
  const [likeCount, setLikeCount] = useState(bookmark.likeCount);
  const [isEdit, toggleEdit] = useState(false);
  const [isTagEdit, toggleTagEdit] = useState(false);
  const [editModal, tabEditModal] = useState(false);
  const [isAiOpen, setIsAIOpen] = useState(false);
  // 그냥 더미. 있어야됨. 삭제 ㄴㄴ
  const [nothingMode, tabNothing] = useState(false);

  const { whatCategory } = mainTabStore();
  const { userId, token } = authStore();

  useEffect(() => {
    setIsAIOpen(false);
  }, [whatCategory.categoryName]);

  //좋아요
  const clickHeart = (): void => {
    if (isLike) {
      axios.delete(
        `${API_BASE_URL}/api/bookmark/like/${userId}/${bookmark.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLikeCount(likeCount - 1);
    } else {
      axios.post(
        `${API_BASE_URL}/api/bookmark/like/${userId}/${bookmark.id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLikeCount(likeCount + 1);
    }
    toggleLike(!isLike);
  };

  const isDark = darkModeStore((state) => state.isDark);

  // 태그 수정
  const submitTag = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const checkErr = () => {
      let err = false;
      tempTags.map((tag) => (tag.title === tempTag ? (err = true) : ""));
      return err;
    };

    const errr = await checkErr();

    if (errr) {
      setGlobalNotification({
        message: "중복된 태그가 존재합니다",
        type: "error",
      });
    } else if (tempTag.trim()) {
      editTempTags([...tempTags, { title: tempTag }]);
    }
    editTempTag("");
    toggleTagEdit(false);
  };

  // 최종 수정
  function completeEdit(): void {
    toggleEdit(false);
    toggleTagEdit(false);
    editTempBookmark({ ...tempBookmark, title: tempTitle });

    axios.put(
      `${API_BASE_URL}/api/bookmark/update/${bookmark.id}`,
      {
        url: bookmark.url,
        title: tempTitle,
        tags: tempTags,
        content: bookmark.content,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          userId: userId,
        },
      }
    );
  }

  return (
    <>
      <div
        className={
          (isDark ? "hover:bg-slate-700" : "hover:bg-slate-100") +
          (whatCategory.categoryName === bookmark.category ||
          whatCategory.categoryName === ""
            ? " "
            : " hidden") +
          " card card-side bg-base-100 shadow-sm hover:cursor-pointer min-h-28 my-1 w-full"
        }
      >
        <>
          <div className="card-body flex flex-row items-center w-full justify-between">

            {/* 왼쪽 이미지 제목 url부분 */}
            <div className="w-1/2 flex flex-row justify-start items-center">
              <img
                src={ogImage || "default-image.jpg"}
                alt={bookmark.url}
                className="h-12 me-4 w-12 "
              />
              <div
                className="flex flex-col justify-around w-2/3"
                onClick={() => {
                  !isEdit &&
                    window.open(
                      bookmark.url.includes("https")
                        ? `${bookmark.url}`
                        : `https://${bookmark.url}`
                    );
                }}
              >
                <div>
                  {isEdit ? (
                    <input
                      type="text"
                      value={tempTitle}
                      onChange={(e) => editTempTitle(e.target.value)}
                      className="text-xl font-bold border-slate-400 border rounded-md w-full"
                      maxLength={50}
                    />
                  ) : (
                    <h2 className="text-lg lg:text-xl font-bold line-clamp-3">
                      {tempBookmark.title}
                    </h2>
                  )}
                </div>
                <div className="underline underline-offset-1 text-sm text-slate-500  text-ellipsis truncate w-full">
                  {bookmark.url}
                </div>
              </div>
            </div>

            {/* 태그 드롭다운 오른쪽 부분 */}
            <div className="flex flex-row justify-end items-center">
              <div className="flex flex-col">
                <div className="hidden items-center  text-slate-500  lg:flex flex-wrap justify-end">
                  {tempTags.map((tag) => (
                    <EditTag
                      tag={tag.title}
                      isEdit={isEdit}
                      tempTags={tempTags}
                      editTempTags={editTempTags}
                    />
                  ))}{" "}
                </div>
                <div className="flex flex-row justify-end">
                <form
                  onSubmit={(e) => submitTag(e)}
                  className={(isTagEdit ? "" : "hidden") + " w-1/2"}
                >
                  <input
                    type="text"
                    value={tempTag}
                    onChange={(e) => editTempTag(e.target.value)}
                    className="w-full border border-slate-400 rounded-md ps-2"
                  />
                </form>
                </div>
              </div>

              {/* 태그 추가 위치 */}
              <div className="card-actions justify-end flex items-center">
                {isEdit ? (
                  <div
                    className={
                      (tempTags.length >= 3 ? "hidden" : "ms-2") +
                      (isTagEdit ? " hidden" : "")
                    }
                  >
                    <FaPlus onClick={() => toggleTagEdit(true)} />
                  </div>
                ) : (
                  <button onClick={clickHeart} className="btn btn-ghost">
                    {isLike ? <FaHeart color="red" /> : <FaRegHeart />}
                    {likeCount}{" "}
                  </button>
                )}

                {isEdit ? (
                  <button
                    className="bg-sky-500 rounded-xl text-white py-2 px-3 hover:bg-sky-600 ms-2"
                    onClick={completeEdit}
                  >
                    수정
                  </button>
                ) : (
                  // 북마크 전용 드롭다운
                  <KebabDropdown
                    bookmark={bookmark}
                    isEdit={isEdit}
                    toggleEdit={toggleEdit}
                    editBookmarks={editBookmarks}
                    changeEditBookmarks={changeEditBookmarks}
                    tabModal={tabEditModal}
                    toggleMode={tabNothing}
                    editBookmarksIndex={editBookmarksIndex}
                    changeEditBookmarksIndex={changeEditBookmarksIndex}
                    setIsAIOpen={setIsAIOpen}
                    canEdit={canEdit}
                  />
                )}
              </div>
            </div>
          </div>
        </>
      </div>

      {/* AI요약 탭 열리는 위치 */}
      <div
        className={
          (isDark ? "bg-sky-950 text-slate-300" : "bg-sky-100") +
          (isAiOpen && " py-5") +
          " ps-9 pe-12 mt-3 "
        }
      >
        {isAiOpen ? (
          <>
            <AIContent bookmarkId={bookmark.id} setIsAIOpen={setIsAIOpen} />
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};
export default Bookmark;
