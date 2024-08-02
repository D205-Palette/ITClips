import { VscKebabVertical } from "react-icons/vsc";
import { FC, useState } from "react";
import MoveBookmarkModal from "../aside/modals/MoveBookmarkModal";
import type { BookmarkType } from "../../types/BookmarkType";
import FavoriteConfirmationModal from "../aside/modals/FavoriteConfirmModal";
import ReportModal from "../aside/modals/ReportModal";
import DeleteBookmarkListModal from "../aside/modals/DeleteBookmarkListModal";
import UrlCopyModal from "./UrlCopyModal";
import ScrapConfirmationModal from "../aside/modals/ScrapComfirmModal";

// 무슨 탭에서 눌렀는지 받는 인자
// 리스트, 즐겨찾기, 로드맵, 북마크 4가지로 받을예정. 그룹 리스트랑 그냥 리스트는 차이 없음
interface Props {
  whatMenu: string;
  // id 가 그떄그때마다 listID, roadmapId, bookmarkId 달라짐
  bookmark: BookmarkType;
  isEdit: boolean;
  toggleEdit: React.Dispatch<React.SetStateAction<boolean>>;
  editBookmarks: BookmarkType[];
  changeEditBookmarks: React.Dispatch<React.SetStateAction<BookmarkType[]>>;
  editBookmarksIndex: number[];
  changeEditBookmarksIndex: React.Dispatch<React.SetStateAction<number[]>>;
  tabModal: React.Dispatch<React.SetStateAction<boolean>>;
  toggleMode: React.Dispatch<React.SetStateAction<boolean>>;
  setIsAIOpen : React.Dispatch<React.SetStateAction<boolean>>;
}

const KebabDropdown: FC<Props> = ({
  whatMenu,
  bookmark,
  toggleEdit,
  changeEditBookmarksIndex,
  toggleMode,
  setIsAIOpen,
}) => {
  const [isOpen, onClose] = useState<boolean>(false);
  const [editModal, tabEditModal] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isUrlCopyModalOpen, setIsUrlCopyModalOpen] = useState<boolean>(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState<boolean>(false);
  const [isFavoriteModalOpen, setIsFavoriteModalOpen] = useState<boolean>(false);


  return (
    <>
      <div className="dropdown dropdown-bottom dropdown-end ">
        <div tabIndex={0} role="button" className="btn m-1 btn-ghost ">
          <VscKebabVertical />
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-100 rounded-box w-52 p-2 shadow z-30"
        >
          {/* 이구간은 내꺼 남꺼일때& 즐겨찾기일떄 유무 */}
          <li className={whatMenu === "즐겨찾기" ? "hidden" : ""}>
            <a onClick={() => toggleEdit(true)}>수정하기</a>
          </li>
          <li onClick={() => setIsDeleteModalOpen(true)}>
            <a>삭제하기</a>
          </li>
          {/*  */}

          <li onClick={() => setIsUrlCopyModalOpen(true)}>
            <a onClick={() => navigator.clipboard.writeText(bookmark.url)}>
              url 복사
            </a>
          </li>
          <li className={whatMenu === "북마크" ? "" : "hidden"} onClick={()=>{setIsAIOpen(true); toggleEdit(false);}}>
            <a>AI 요약</a>
          </li>
          <li
            className={whatMenu === "북마크" ? "" : "hidden"}
            onClick={() => tabEditModal(true)}
          >
            <a>내 리스트에 추가</a>
          </li>
          <li
            className={whatMenu === "로드맵" ? "hidden" : ""}
            onClick={() => setIsReportModalOpen(true)}
          >
            <a>신고하기</a>
          </li>
        </ul>
      </div>

      {/* 내 리스트에 추가 */}
      {editModal && (
        <MoveBookmarkModal
          editBookmarks={[bookmark]}
          tabModal={tabEditModal}
          toggleMode={toggleMode}
          changeEditBookmarksIndex={changeEditBookmarksIndex}
          whatMenu={"추가"}
        />
      )}

      {isDeleteModalOpen && (
        <DeleteBookmarkListModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
        />
      )}
      {isUrlCopyModalOpen && (
        <UrlCopyModal
          isOpen={isUrlCopyModalOpen}
          onClose={() => setIsUrlCopyModalOpen(false)}
        />
      )}
      {isReportModalOpen && (
        <ReportModal
          isOpen={isReportModalOpen}
          onClose={() => setIsReportModalOpen(false)}
        />
      )}
      {isFavoriteModalOpen && (
        <FavoriteConfirmationModal
          isOpen={isFavoriteModalOpen}
          onClose={() => setIsFavoriteModalOpen(false)}
        />
      )}
    </>
  );
};
export default KebabDropdown;
