// 이미지 , 리스트명, 북마크 개수, 태그, 설명, 좋아요 버튼&좋아요 수, 리스트 세부 조작 버튼
import { useState, FC } from "react";
import useStore from "../../stores/mainStore";
import KebabDropdown from "../common/KebabDropdown(Bookmark)";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import darkModeStore from "../../stores/darkModeStore";
import mainStore from "../../stores/mainStore";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
// const bookmarks = {
//     title: string,
//     url: string,
//     description: string,
//     bookmark_like: number,
//     category: string,
//   }

interface Props {
  bookmark: {
    id: number;
    category: string;
    title: string;
    url: string;
    tags: {
      title: string;
    }[];
    content: string;
    isLiked: boolean;
    likeCount: number;
  };
}

const Bookmark: FC<Props> = ({ bookmark }) => {
  const navigate = useNavigate();

  const [isLike, toggleLike] = useState(bookmark.isLiked);

  const [isEdit, toggleEdit] = useState(false);
  const [isTagEdit, toggleTagEdit] = useState(false);

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
    window.location.href = url;
  }
  
  // 태그 수정
  function submitTag(): void {
    // tempBookmark를 formData로 해서 put 요청
    editTempTags([...tempTags, { title: tempTag }]);
    editTempTag('')
    toggleTagEdit(false);
  }

  function completeEdit():void {
    toggleEdit(false)
    editTempBookmark({...tempBookmark, title:tempTitle, tags:tempTags})
    // 최종 수정
    //  /bookmark /update/{bookmarkId} 로 put요청

  }

  return (
    <>
      <div
        className={
          (isDark ? "hover:bg-slate-700" : "hover:bg-slate-100") +
          " card card-side bg-base-100 shadow-xl hover:cursor-pointer h-28 my-1"
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
                      type='text'
                      value={tempTitle}
                      onChange={(e) => editTempTitle(e.target.value)}
                      className="text-xl font-bold border-slate-400 border rounded-md"
                    />
                ) : (
                  <h2 className="flex-auto card-title">{tempBookmark.title}</h2>
                )}
              </div>
              <div className="underline underline-offset-1">{tempBookmark.url}</div>
            </div>

            <div className="hidden items-center md:inline-flex ">
              {tempTags.map((tag) => (
                <span className="ms-1">{" # " + tag.title}</span>
              ))}{" "}
            </div>

            <div className="card-actions justify-end flex items-center">
              {isEdit ? 
                (isTagEdit ? (
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
                ))
               : (
                <button onClick={clickHeart} className="btn btn-ghost">
                  {isLike ? <FaHeart color="red" /> : <FaRegHeart />}
                  {bookmark.likeCount}{" "}
                </button>
              )}

              {isEdit ? (
                <button className="bg-sky-500 rounded-xl text-white py-2 px-3 hover:bg-sky-600"
                onClick={completeEdit}>
                  수정
                </button>
              ) : (
                <KebabDropdown
                  whatMenu="북마크"
                  id={bookmark.id}
                  url={bookmark.url}
                  isEdit={isEdit}
                  toggleEdit={toggleEdit}
                />
              )}
            </div>
          </div>
        </>
      </div>
    </>
  );
};
export default Bookmark;
