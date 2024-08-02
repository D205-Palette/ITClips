// 이미지 , 리스트명, 북마크 개수, 태그, 설명, 좋아요 버튼&좋아요 수, 리스트 세부 조작 버튼
import { useState, FC } from "react";
import useStore from "../../stores/mainStore";
import KebabDropdown from "../common/KebabDropdown(Bookmark)";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import darkModeStore from "../../stores/darkModeStore";
import mainStore from "../../stores/mainStore";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import type { BookmarkType } from "../../types/BookmarkType";
import HoverTag from "./Bookmark(EditTag)";
import AISummary from "./BookmarkAISummary";
import { RiRobot3Line } from "react-icons/ri";
import { IoIosArrowUp } from "react-icons/io";

// const bookmarks = {
//     title: string,
//     url: string,
//     description: string,
//     bookmark_like: number,
//     category: string,
//   }

interface Props {
  bookmark: BookmarkType;
  editBookmarks: BookmarkType[];
  changeEditBookmarks: React.Dispatch<React.SetStateAction<BookmarkType[]>>;
  editBookmarksIndex: number[];
  changeEditBookmarksIndex: React.Dispatch<React.SetStateAction<number[]>>;
}

const Bookmark: FC<Props> = ({
  bookmark,
  editBookmarks,
  changeEditBookmarks,
  editBookmarksIndex,
  changeEditBookmarksIndex,
}) => {
  const navigate = useNavigate();

  const [isLike, toggleLike] = useState(bookmark.isLiked);

  const [isEdit, toggleEdit] = useState(false);
  const [isTagEdit, toggleTagEdit] = useState(false);
  const [editModal, tabEditModal] = useState(false);
  const [isHoverTag, setHoverTag] = useState(false);
  const [isAiOpen, setIsAIOpen] = useState(false);
  // 그냥 더미. 있긴해야됨
  const [nothingMode, tabNothing] = useState(false);

  const [tempBookmark, editTempBookmark] = useState(bookmark);
  const [tempTitle, editTempTitle] = useState(bookmark.title);
  const [tempTags, editTempTags] = useState(bookmark.tags);
  const [tempTag, editTempTag] = useState("");

  const clickHeart = (): void => {
    toggleLike(!isLike);
    //여기에 좋아요 api호출
  };
  const isDark = darkModeStore((state) => state.isDark);

  function goExternalUrl(url: string): void {
    window.open(url);
  }

  // 태그 수정
  function submitTag(): void {
    // tempBookmark를 formData로 해서 put 요청
    editTempTags([...tempTags, { title: tempTag }]);
    editTempTag("");
    toggleTagEdit(false);
  }

  function completeEdit(): void {
    toggleEdit(false);
    editTempBookmark({ ...tempBookmark, title: tempTitle, tags: tempTags });
    // 최종 수정
    //  /bookmark /update/{bookmarkId} 로 put요청
  }

  return (
    <>
      <div
        className={
          (isDark ? "hover:bg-slate-700" : "hover:bg-slate-100") +
          " card card-side bg-base-100 shadow-sm hover:cursor-pointer h-28 my-1"
        }
      >
        <>
          <div className="card-body flex flex-row items-center">
            {/* 주소에 https 포함 여부 확인해야할듯 */}

            <div
              className="flex flex-col flex-auto justify-around"
              onClick={() => {
                !isEdit && goExternalUrl(`https://${bookmark.url}`);
              }}
            >
              <div>
                {isEdit ? (
                  <input
                    type="text"
                    value={tempTitle}
                    onChange={(e) => editTempTitle(e.target.value)}
                    className="text-xl font-bold border-slate-400 border rounded-md"
                  />
                ) : (
                  <h2 className="flex-auto card-title">{tempBookmark.title}</h2>
                )}
              </div>
              <div className="underline underline-offset-1">
                {tempBookmark.url}
              </div>
            </div>

            {/* 태그들 */}
            <div className="hidden items-center md:inline-flex ">
              {tempTags.map((tag) => (
                <span className="ms-1">{" # " + tag.title}</span>
              ))}{" "}
            </div>

            {/* 태그 추가 위치 */}
            <div className="card-actions justify-end flex items-center">
              {isEdit ? (
                isTagEdit ? (
                  <form onSubmit={() => submitTag()} className="w-1/3">
                    <input
                      type="text"
                      value={tempTag}
                      onChange={(e) => editTempTag(e.target.value)}
                      className="w-full border border-slate-400 rounded-md"
                    />
                  </form>
                ) : (
                  <FaPlus onClick={() => toggleTagEdit(true)} />
                )
              ) : (
                <button onClick={clickHeart} className="btn btn-ghost">
                  {isLike ? <FaHeart color="red" /> : <FaRegHeart />}
                  {bookmark.likeCount}{" "}
                </button>
              )}

              {isEdit ? (
                <button
                  className="bg-sky-500 rounded-xl text-white py-2 px-3 hover:bg-sky-600"
                  onClick={completeEdit}
                >
                  수정
                </button>
              ) : (
                <KebabDropdown
                  whatMenu="북마크"
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
                />
              )}
            </div>
          </div>
        </>
      </div>

      {/* AI요약 탭 열리는 위치 */}
      <div className="ps-8 pe-12 mt-3 bg-sky-100">
        {isAiOpen ? (
          <>
          <div className="flex flex-row justify-between">
            <RiRobot3Line size={24} />
            <IoIosArrowUp />
            </div>
            <p>AI 요약입니다ㅏㅏㅏ</p>
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};
export default Bookmark;
