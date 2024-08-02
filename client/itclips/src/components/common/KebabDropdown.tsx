import { VscKebabVertical } from "react-icons/vsc";
import { FC, useState } from "react";
import BookmarkListEditModal from "../aside/modals/BookmarkListEditModal";
import FavoriteConfirmationModal from "../aside/modals/FavoriteConfirmModal";
import ReportModal from "../aside/modals/ReportModal";
import DeleteBookmarkListModal from "../aside/modals/DeleteBookmarkListModal";
import UrlCopyModal from "./UrlCopyModal";
import ScrapConfirmationModal from "../aside/modals/ScrapComfirmModal";

// 무슨 탭에서 눌렀는지 받는 인자
// 리스트, 즐겨찾기, 로드맵  3가지로 받을예정. 그룹 리스트랑 그냥 리스트는 차이 없음
interface Props {
  whatMenu: string;
  // id 가 그떄그때마다 listID, roadmapId 달라짐
  id: number;
}

const KebabDropdown: FC<Props> = ({ whatMenu, id }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isUrlCopyModalOpen, setIsUrlCopyModalOpen] = useState<boolean>(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState<boolean>(false);
  const [isFavoriteModalOpen, setIsFavoriteModalOpen] = useState<boolean>(false);
  const [isScrapModalOpen, setIsScrapModalOpen] = useState<boolean>(false);

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
          {/* 수정 삭제는 남꺼일때 안 보이게 */}
          <li
            className={whatMenu === "즐겨찾기" ? "hidden" : ""}
            onClick={() => setIsEditModalOpen(true)}
          >
            <a>수정하기</a>
          </li>
          <li  onClick={() => setIsDeleteModalOpen(true)}>
            <a>삭제하기</a>
          </li>
          {/*  */}

          <li onClick={() => setIsUrlCopyModalOpen(true)}>
            <a>url 복사</a>
          </li>
          <li
            className={
              whatMenu === "로드맵" || whatMenu === "북마크" ? "hidden" : ""
            }
            onClick={() => setIsFavoriteModalOpen(true)}
          >
            {/* 내 즐겨찾기에 있는지 유무 따져서 즐겨찾기 삭제로 출력해주기 */}
            <a>즐겨찾기</a>
          </li>
          <li className={whatMenu === "로드맵" ? "" : "hidden"}
          onClick={() => setIsScrapModalOpen(true)}>
            <a>스크랩</a>
          </li>
          <li className={whatMenu === "로드맵" ? "hidden" : ""}
          onClick={() => setIsReportModalOpen(true)}>
            <a>신고하기</a>
          </li>
        </ul>
      </div>

      {isEditModalOpen && (
        <BookmarkListEditModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
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
      {isScrapModalOpen && (
        <ScrapConfirmationModal
          isOpen={isScrapModalOpen}
          onClose={() => setIsScrapModalOpen(false)}
        />
      )}
    </>
  );
};
export default KebabDropdown;
