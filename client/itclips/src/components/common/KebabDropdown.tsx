import { VscKebabVertical } from "react-icons/vsc";
import { FC, useEffect, useState } from "react";
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
  contentUserId?:number;
  users?:{id:number,nickName:string}[]
}

const KebabDropdown: FC<Props> = ({ whatMenu, id,contentUserId,users }) => {
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
          axios.delete(`${API_BASE_URL}/api/list/scrap/${userId}/${id}`,{
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setGlobalNotification({
            message: "즐겨찾기 삭제 완료",
            type: "error",
          });
        } else {
        }
      });
  }
  const [canEdit, setCanEdit] = useState(false)
  
  useEffect(()=>{
    if(users){
      users.map((user) => user.id===userId? setCanEdit(true): "")
    }
  },[])

  // 로드맵 스크랩
  function addScrap(): void {
    axios
      .post(`${API_BASE_URL}/api/roadmap/scrap/${id}/${userId}`, {}, {
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

  function copyUrl(whatMenu: string, id: number): any {
    // 기본적으로 로컬호스트 주소를 가져옴    
  
    // whatMenu 값에 따라 URL을 생성
    let url = "";
    if (whatMenu === "리스트" || whatMenu === "즐겨찾기") {
      url = `${API_BASE_URL}/bookmarklist/${id}`;
    } else if (whatMenu === "로드맵") {
      url = `${API_BASE_URL}/roadmap/${id}`;
    } else {
      console.error("Invalid menu type");
      return;
    }
  
    // URL을 클립보드에 복사
    navigator.clipboard.writeText(url).then(() => {
      // 복사가 성공적으로 완료되면 알림 설정
      setGlobalNotification({
        message: "URL 복사 완료",
        type: "success",
      });
    }).catch(err => {
      console.error("Failed to copy URL: ", err);
    });
  
    // 메뉴 닫기
    setIsMenuOpen(false);
  }

  

  function deleteFavorite(): void {
    setIsMenuOpen(false);
    axios.delete(`${API_BASE_URL}/api/list/scrap/${userId}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(()=>{
      setIsFavoriteChange(true)
    })
    setGlobalNotification({
      message: "즐겨찾기 삭제 완료",
      type: "error",
    });
  }

  return (
    <>
      <div className="dropdown dropdown-bottom dropdown-end">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-sm md:btn-md m-0.5 md:m-1 btn-ghost btn-circle"
          onClick={() => setIsMenuOpen(true)}
        >
          <VscKebabVertical className="w-4 h-4 md:w-5 md:h-5" />
        </div>
        {isMenuOpen && (
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-100 rounded-box w-44 md:w-52 p-1.5 md:p-2 shadow z-30 text-sm md:text-base"
          >
            {userId === contentUserId || canEdit ? (
              <>
                <li
                  className={whatMenu === "즐겨찾기" ? "hidden" : ""}
                  onClick={() => {
                    whatMenu === "로드맵"
                      ? navigate(`/roadmap/${id}/edit`)
                      : setIsEditModalOpen(true);
                  }}
                >
                  <a className="py-1.5 md:py-2">수정하기</a>
                </li>
                <li
                  className={whatMenu === "즐겨찾기" ? "hidden" : ""}
                  onClick={() => setIsDeleteModalOpen(true)}
                >
                  <a className="py-1.5 md:py-2">삭제하기</a>
                </li>
              </>
            )}
            {/*  */}

            <li onClick={() => copyUrl(whatMenu, id)}>
              <a>url 복사</a>
            </li>
            <li
              className={whatMenu === "즐겨찾기" ? "" : "hidden"}
              onClick={() => deleteFavorite()}
            >
              <a className="py-1.5 md:py-2">즐겨찾기 삭제</a>
            </li>
            <li
              className={(userId ? "" : "hidden ") + 
               (whatMenu === "로드맵" ||
                whatMenu === "북마크" ||
                whatMenu === "즐겨찾기"
                  ? " hidden "
                  : "")
              }
              onClick={() => {
                addFavorite();
              }}
            >
              <a className="py-1.5 md:py-2">즐겨찾기</a>
            </li>
            <li
              className={(userId ? "" : "hidden ") + (whatMenu === "로드맵" ? "" : "hidden ")}
              onClick={() => {
                addScrap();
              }}
            >
              <a className="py-1.5 md:py-2">스크랩</a>
            </li>
            <li
              className={(userId ? "" : "hidden ") + (whatMenu === "로드맵" ? "hidden " : "")}
              onClick={() => setIsReportModalOpen(true)}
            >
              <a className="py-1.5 md:py-2">신고하기</a>
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
