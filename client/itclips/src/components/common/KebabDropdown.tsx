import { VscKebabVertical } from "react-icons/vsc";
import { FC, useState } from "react";
import BookmarkListEditModal from "../aside/modals/BookmarkListEditModal";
import FavoriteConfirmationModal from "../aside/modals/FavoriteConfirmModal";
import ReportModal from "../aside/modals/ReportModal";
import DeleteBookmarkListModal from "../aside/modals/DeleteContentModal";
import UrlCopyModal from "./UrlCopyModal";
import ScrapConfirmationModal from "../aside/modals/ScrapComfirmModal";
import { API_BASE_URL } from "../../config";
import axios from "axios";
import { authStore } from "../../stores/authStore";
import { useNavigate } from "react-router-dom";
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

  // 유저 아이디 임시값. 나중엔 스토리지서 받아오면됨
  const {userId, token} = authStore()
  // 리스트 즐겨찾기
  function addFavorite ():void {
    axios.post(`${API_BASE_URL}/api/list/scrap/${userId}/${id}`,
      {headers: {
        Authorization: `Bearer ${token}`,
      },}
    )
  }
  // 로드맵 스크랩
  function addScrap ():void {
    axios.post(`${API_BASE_URL}/api/roadmap/scrap/${id}/${userId}`,
      {headers: {
        Authorization: `Bearer ${token}`,
      },}
    )
  }

  function copyUrl () :void {
    // 뭐가 들어오는지에 따라 url값이 바뀜
    // navigator.clipboard.writeText(bookmark.url)
    // 이건좀 생각해봐야할듯
  }

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

          <li onClick={() => {setIsUrlCopyModalOpen(true);}}>
            <a>url 복사</a>
          </li>
          <li
            className={
              whatMenu === "로드맵" || whatMenu === "북마크" ? "hidden" : ""
            }
            onClick={() => {setIsFavoriteModalOpen(true); addFavorite();}}
          >
            {/* 내 즐겨찾기에 있는지 유무 따져서 즐겨찾기 삭제로 출력해주기 */}
            <a>즐겨찾기</a>
          </li>
          <li className={whatMenu === "로드맵" ? "" : "hidden"}
          onClick={() => {setIsScrapModalOpen(true); addScrap() }}>
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
          id={id}
        />
      )}

      {isDeleteModalOpen && (
        <DeleteBookmarkListModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          whatContent={whatMenu}
          id={id}
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
          whatContent={whatMenu}
          id={id}
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
