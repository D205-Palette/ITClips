// 이미지 , 리스트명, 북마크 개수, 태그, 설명, 좋아요 버튼&좋아요 수, 리스트 세부 조작 버튼
import { useState, FC,useEffect } from "react";
import KebabDropdown from "../common/KebabDropdown(Bookmark)";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import darkModeStore from "../../stores/darkModeStore";
import { FaPlus } from "react-icons/fa6";
import type { BookmarkType } from "../../types/BookmarkType";
import HoverTag from "./Bookmark(Tag)";
import AISummary from "./BookmarkAISummary";
import { RiRobot3Line } from "react-icons/ri";
import { IoIosArrowUp } from "react-icons/io";
import axios from "axios";
import { authStore } from "../../stores/authStore";
import { API_BASE_URL } from "../../config";
import EditTag from "./Bookmark(Tag)";

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

  const [tempBookmark, editTempBookmark] = useState<BookmarkType>(bookmark);
  const [tempTitle, editTempTitle] = useState<string>('');
  const [tempTags, editTempTags] = useState(bookmark.tags);
  const [tempTag, editTempTag] = useState("");

  useEffect(() => {
    async function fetchData() {
      editTempBookmark(bookmark)
      editTempTitle(bookmark.title)
      editTempTags(bookmark.tags)
      editTempTag("")
    }
    fetchData();
  }, []);

  const [isLike, toggleLike] = useState(bookmark.isLiked);
  const [likeCount, setLikeCount] = useState(bookmark.likeCount);
  const [isEdit, toggleEdit] = useState(false);
  const [isTagEdit, toggleTagEdit] = useState(false);
  const [editModal, tabEditModal] = useState(false);
  const [isHoverTag, setIsHoverTag] = useState(false);
  const [isAiOpen, setIsAIOpen] = useState(false);
  // 그냥 더미. 있어야됨. 삭제 ㄴㄴ
  const [nothingMode, tabNothing] = useState(false);



  const { userId, token } = authStore();

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
      axios.post(`${API_BASE_URL}/api/bookmark/like/${userId}/${bookmark.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLikeCount(likeCount + 1);
    }
    toggleLike(!isLike);
  };

  const isDark = darkModeStore((state) => state.isDark);

  // 태그 수정
  function submitTag(): void {
    // tempBookmark를 formData로 해서 put 요청
    editTempTags([...tempTags, { title: tempTag }]);
    
    editTempTag("");
    toggleTagEdit(false);
  }

  // 최종 수정
  function completeEdit(): void {
    toggleEdit(false);
    // editTempBookmark({ ...tempBookmark, title: tempTitle, tags: tempTags });
    editTempBookmark({...tempBookmark, title:tempTitle})
    //  /bookmark /update/{bookmarkId} 로 put요청
    axios.put(`${API_BASE_URL}/api/bookmark/update/${bookmark.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
        url:bookmark.url,
        title:tempTitle,
        tags:tempTags,
        content:bookmark.content,
      
    });
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
                !isEdit && window.open(`https://${bookmark.url}`);
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
                <EditTag
                  tag={tag.title}
                  isEdit={isEdit}
                  tempTags={tempTags}
                  editTempTags={editTempTags}
                />
                // <span className="ms-1">{" # " + tag.title}</span>
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
                  {likeCount}{" "}
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
