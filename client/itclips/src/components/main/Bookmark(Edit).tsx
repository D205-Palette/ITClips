// 이미지 , 리스트명, 북마크 개수, 태그, 설명, 좋아요 버튼&좋아요 수, 리스트 세부 조작 버튼
import { useState, FC, useEffect } from "react";
import useStore from "../../stores/mainStore";
import KebabDropdown from "../common/KebabDropdown";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import darkModeStore from "../../stores/darkModeStore";
import mainStore from "../../stores/mainStore";
import { useNavigate } from "react-router-dom";
import { LuChevronsUpDown } from "react-icons/lu";
import MoveBookmarkModal from "../aside/modals/MoveBookmarkModal";
import type { BookmarkType } from "../../types/BookmarkType";
import mainTabStore from "../../stores/mainTabStore";

interface Props {
  bookmark: BookmarkType;
  editBookmarks: BookmarkType[];
  changeEditBookmarks: React.Dispatch<React.SetStateAction<BookmarkType[]>>;
  editBookmarksIndex: number[];
  changeEditBookmarksIndex: React.Dispatch<React.SetStateAction<number[]>>;
}

const Bookmark: FC<Props> = ({
  bookmark,
  // 그냥 값들은 이동할때 필요한 추가 데이터 용도
  editBookmarks,
  changeEditBookmarks,
  // index들은 삭제 용도
  editBookmarksIndex,
  changeEditBookmarksIndex,
}) => {
  const navigate = useNavigate();

  const { whatCategory } = mainTabStore();

  const isDark = darkModeStore((state) => state.isDark);

  function goExternalUrl(url: string): void {
    window.location.href = url;
  }

  function toggleCheck(bookmark: BookmarkType): void {
    setChangeCheck(true);
    if (editBookmarksIndex.includes(bookmark.id)) {
      changeEditBookmarksIndex(
        editBookmarksIndex.filter(
          (editBookmark) => editBookmark !== bookmark.id
        )
      );
      changeEditBookmarks(
        editBookmarks.filter((editBookmark) => editBookmark.id !== bookmark.id)
      );
    } else {
      changeEditBookmarksIndex([...editBookmarksIndex, bookmark.id]);
      changeEditBookmarks([...editBookmarks, bookmark]);
    }
  }
  const [isCheck, setIsCheck] = useState(false);
  const [changeCheck, setChangeCheck] = useState(false);
  useEffect(() => {
    if (editBookmarksIndex.includes(bookmark.id)) {
      setIsCheck(true);
      setChangeCheck(false);
    } else {
      setIsCheck(false);
      setChangeCheck(false);
    }
  }, [changeCheck]);

  return (
    <>
      <div
        className={
          (whatCategory.categoryName === bookmark.category ||
          whatCategory.categoryName === ""
            ? ""
            : "hidden ") +
          (isDark ? "hover:bg-slate-700" : "hover:bg-slate-100") +
          " card card-side bg-base-100 hover:cursor-pointer h-28 my-1 shadow-sm w-full"
        }
      >
        <>
          <div className="card-body flex flex-row items-center w-full">
            {/* 체크박스 */}
            <div className="form-control flex flex-row items-center">
              <input
                type="checkbox"
                defaultChecked={isCheck}
                onClick={() => toggleCheck(bookmark)}
                className="checkbox checkbox-info  [--chkfg:white] me-5"
              />
            </div>
            <div className="flex justify-between w-5/6">
            {/* 본문 */}
            <div className="flex flex-col  justify-around w-2/3">
     
     
                <p className="truncate text-ellipsis font-bold text-lg ">{bookmark.title}</p>{" "}
         
              <div className="underline underline-offset-1 truncate text-ellipsis">{bookmark.url}</div>
            </div>

            {/* 태그 */}
            <div className="hidden items-end md:inline-flex flex-col">
              {bookmark.tags.map((tag) => (
                <span className="ms-1">{" # " + tag.title}</span>
              ))}{" "}
            </div>
            </div>
          </div>
        </>
      </div>
    </>
  );
};
export default Bookmark;
