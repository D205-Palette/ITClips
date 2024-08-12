import { VscKebabVertical } from "react-icons/vsc";
import { FC, useState } from "react";
import BookmarkListEditModal from "../aside/modals/BookmarkListEditModal";
import FavoriteConfirmationModal from "../aside/modals/FavoriteConfirmModal";
import FavoriteDeleteModal from "../aside/modals/FavoriteDeleteModal";
import ReportModal from "../aside/modals/ReportModal";
import DeleteBookmarkListModal from "../aside/modals/DeleteContentModal";
import UrlCopyModal from "./UrlCopyModal";
import ScrapConfirmationModal from "../aside/modals/ScrapComfirmModal";
import { API_BASE_URL } from "../../config";
import axios from "axios";
import { authStore } from "../../stores/authStore";
import { useNavigate } from "react-router-dom";
import mainStore from "../../stores/mainStore";
import { useParams } from "react-router-dom";
import toastStore from "../../stores/toastStore";
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
  const [isFavoriteModalOpen, setIsFavoriteModalOpen] =
    useState<boolean>(false);
  const [isDeleteFavoriteModalOpen, setIsDeleteFavoriteModalOpen] =
    useState<boolean>(false);
  const [isScrapModalOpen, setIsScrapModalOpen] = useState<boolean>(false);
  const { setGlobalNotification } = toastStore();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const params = useParams();
  const nowUserId = params.userId;
  const navigate = useNavigate();
  const { setIsRoadmapChange,setIsFavoriteChange } = mainStore();

  // 유저 아이디 임시값. 나중엔 스토리지서 받아오면됨
  const { userId, token } = authStore();
  // 리스트 즐겨찾기
  function addFavorite(): void {
    axios({
      method: "post",
      url: `${API_BASE_URL}/api/list/scrap/${userId}/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => {
        setIsMenuOpen(false);
        setGlobalNotification({
          message: "즐겨찾기 추가 완료",
          type: "success",
        });
      })
      .catch((err) => {
        if (err.response.status === 400) {
          setIsMenuOpen(false);
          axios.delete(`${API_BASE_URL}/api/list/scrap/${userId}/${id}`);
          setGlobalNotification({
            message: "즐겨찾기 삭제 완료",
            type: "error",
          });
        } else {
        }
      });
  }
  // 로드맵 스크랩
  function addScrap(): void {
    axios
      .post(`${API_BASE_URL}/api/roadmap/scrap/${id}/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setIsRoadmapChange(true);
        setIsMenuOpen(false);
        setGlobalNotification({
          message: "로드맵 스크랩 완료",
          type: "success",
        });
      });
  }

  function copyUrl(): any {
    // 뭐가 들어오는지에 따라 url값이 바뀜
    // navigator.clipboard.writeText(bookmark.url)
    // 이건좀 생각해봐야할듯
    setIsMenuOpen(false);
    setGlobalNotification({
      message: "url 복사 완료",
      type: "success",
    });
  }

  function deleteFavorite(): void {
    setIsMenuOpen(false);
    axios.delete(`${API_BASE_URL}/api/list/scrap/${userId}/${id}`).then(()=>{
      setIsFavoriteChange(true)
    })
    setGlobalNotification({
      message: "즐겨찾기 삭제 완료",
      type: "error",
    });
  }
  return (
    <>
      <div className="dropdown dropdown-bottom dropdown-end ">
        <div
          tabIndex={0}
          role="button"
          className="btn m-1 btn-ghost "
          onClick={() => setIsMenuOpen(true)}
        >
          <VscKebabVertical />
        </div>
        {isMenuOpen && (
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-100 rounded-box w-52 p-2 shadow z-30"
          >
            {/* 수정 삭제는 남꺼일때 안 보이게 */}
            {String(userId) !== nowUserId ? (
              <></>
            ) : (
              <>
                <li
                  className={whatMenu === "즐겨찾기" ? "hidden " : ""}
                  onClick={() => {
                    whatMenu === "로드맵"
                      ? navigate(`/roadmap/${id}/edit`)
                      : setIsEditModalOpen(true);
                  }}
                >
                  <a>수정하기</a>
                </li>

                <li
                  className={whatMenu === "즐겨찾기" ? "hidden" : ""}
                  onClick={() => setIsDeleteModalOpen(true)}
                >
                  <a>삭제하기</a>
                </li>
              </>
            )}
            {/*  */}

            <li onClick={() => copyUrl()}>
              <a>url 복사</a>
            </li>

            <li
              className={whatMenu === "즐겨찾기" ? "" : "hidden"}
              onClick={() => deleteFavorite()}
            >
              <a>즐겨찾기 삭제</a>
            </li>
            <li
              className={
                whatMenu === "로드맵" ||
                whatMenu === "북마크" ||
                whatMenu === "즐겨찾기"
                  ? "hidden "
                  : ""
              }
              onClick={() => {
                addFavorite();
              }}
            >
              <a>즐겨찾기</a>
            </li>
            <li
              className={whatMenu === "로드맵" ? "" : "hidden "}
              onClick={() => {
                addScrap();
              }}
            >
              <a>스크랩</a>
            </li>
            <li
              className={whatMenu === "로드맵" ? "hidden " : ""}
              onClick={() => setIsReportModalOpen(true)}
            >
              <a>신고하기</a>
            </li>
          </ul>
        )}
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

      {isReportModalOpen && (
        <ReportModal
          isOpen={isReportModalOpen}
          onClose={() => setIsReportModalOpen(false)}
          whatContent={whatMenu}
          id={id}
        />
      )}
    </>
  );
};
export default KebabDropdown;
