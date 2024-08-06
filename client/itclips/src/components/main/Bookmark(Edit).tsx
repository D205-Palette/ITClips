// 이미지 , 리스트명, 북마크 개수, 태그, 설명, 좋아요 버튼&좋아요 수, 리스트 세부 조작 버튼
import { useState, FC } from "react";
import useStore from "../../stores/mainStore";
import KebabDropdown from "../common/KebabDropdown";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import darkModeStore from "../../stores/darkModeStore";
import mainStore from "../../stores/mainStore";
import { useNavigate } from "react-router-dom";
import { LuChevronsUpDown } from "react-icons/lu";
import MoveBookmarkModal from "../aside/modals/MoveBookmarkModal";
import type { BookmarkType } from "../../types/BookmarkType";
import mainTabStore from '../../stores/mainTabStore'

interface Props {

  bookmark: BookmarkType
  editBookmarks: BookmarkType[];
  changeEditBookmarks: React.Dispatch<React.SetStateAction<BookmarkType[]>>;
  editBookmarksIndex : number[]
  changeEditBookmarksIndex :React.Dispatch<React.SetStateAction<number[]>>;
}

const Bookmark: FC<Props> = ({
  bookmark,
  // 그냥 값들은 이동할때 필요한 추가 데이터 용도
  editBookmarks,
  changeEditBookmarks,
  // index들은 삭제 용도
  editBookmarksIndex,
  changeEditBookmarksIndex
}) => {
  const navigate = useNavigate();

  const [isLike, setIsLike] = useState(false);
  const {whatCategory} = mainTabStore()
  
  const clickHeart = (): void => {
    setIsLike(!isLike);
    //여기에 좋아요 api호출
  };
  const isDark = darkModeStore((state) => state.isDark);

  function goExternalUrl(url: string): void {
    window.location.href = url;
  }

  function toggleCheck(bookmark:BookmarkType): void {
    if(editBookmarksIndex.includes(bookmark.id)){
      changeEditBookmarksIndex(editBookmarksIndex.filter((editBookmark)=>editBookmark!==bookmark.id))
      changeEditBookmarks(editBookmarks.filter((editBookmark)=>editBookmark.id!==bookmark.id))
    } else{
      changeEditBookmarksIndex([...editBookmarksIndex,bookmark.id ])
      changeEditBookmarks([...editBookmarks,bookmark ])
    }
  }

  return (
    <>
      <div
        className={(whatCategory.categoryName===bookmark.category || whatCategory.categoryName===""? "":"hidden ") +
          (isDark ? "hover:bg-slate-700" : "hover:bg-slate-100") +
          " card card-side bg-base-100 shadow-xl hover:cursor-pointer h-28 my-1"
        }
      >
        <>
          <div className="card-body flex flex-row items-center">
            {/* 체크박스 */}
            <div className="form-control flex flex-row items-center">
              <input
                type="checkbox"
                defaultChecked={
                editBookmarksIndex.includes(bookmark.id) ? true : false
                }
                onClick={() => toggleCheck(bookmark)}
                className="checkbox checkbox-info  [--chkfg:white] me-5"
              />
            </div>
            {/* 본문 */}
            <div
              className="flex flex-col flex-auto justify-around"
              onClick={() => goExternalUrl(`https://${bookmark.url}`)}
            >
              <div>
                {" "}
                <h2 className="flex-auto card-title">{bookmark.title}</h2>{" "}
              </div>
              <div className="underline underline-offset-1">{bookmark.url}</div>
            </div>

            {/* 태그 */}
            <div className="hidden items-center md:inline-flex ">
              {bookmark.tags.map((tag) => (
                <span className="ms-1">{" # " + tag.title}</span>
              ))}{" "}
            </div>

            {/* 좋아요 버튼 */}
            <div className="card-actions justify-end flex items-center">
              <button onClick={clickHeart} className="btn btn-ghost">
                {isLike ? <FaHeart color="red" /> : <FaRegHeart />}
                {bookmark.likeCount}{" "}
              </button>
              <button className="">
                <LuChevronsUpDown />
              </button>
            </div>
          </div>
        </>
      </div>

    </>
  );
};
export default Bookmark;
