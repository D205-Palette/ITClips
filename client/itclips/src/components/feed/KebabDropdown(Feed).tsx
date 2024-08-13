import { VscKebabVertical } from "react-icons/vsc";
import { FC, useState } from "react";
import FavoriteConfirmationModal from "../aside/modals/FavoriteConfirmModal";
import ReportModal from "../aside/modals/ReportModal";
import UrlCopyModal from "../common/UrlCopyModal";
import ScrapConfirmationModal from "../aside/modals/ScrapComfirmModal";
import axios from "axios";
import { API_BASE_URL } from "../../config";
import { authStore } from "../../stores/authStore";
import toastStore from "../../stores/toastStore";

// 무슨 탭에서 눌렀는지 받는 인자
// 리스트, 즐겨찾기, 로드맵, 북마크 4가지로 받을예정. 그룹 리스트랑 그냥 리스트는 차이 없음
interface Props {
  whatMenu: string;
  // id 가 그떄그때마다 listID, roadmapId, bookmarkId 달라짐
  id: number;
}

const KebabDropdown: FC<Props> = ({ whatMenu, id }) => {
  const { userId, token } = authStore();
  const [isUrlCopyModalOpen, setIsUrlCopyModalOpen] = useState<boolean>(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState<boolean>(false);
  const [isFavoriteModalOpen, setIsFavoriteModalOpen] =
    useState<boolean>(false);
  const [isScrapModalOpen, setIsScrapModalOpen] = useState<boolean>(false);
  const { setGlobalNotification } = toastStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
  // 로드맵 스크랩
  function addScrap(): void {
    axios
      .post(`${API_BASE_URL}/api/roadmap/scrap/${id}/${userId}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {        
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
    navigator.clipboard
      .writeText(url)
      .then(() => {
        // 복사가 성공적으로 완료되면 알림 설정
        setGlobalNotification({
          message: "URL 복사 완료",
          type: "success",
        });
      })
      .catch((err) => {
        setGlobalNotification({
          message: "URL 복사 실패",
          type: "error",
        });
        console.error("Failed to copy URL: ", err);
      });

    // 메뉴 닫기
    setIsMenuOpen(false);
  }

  return (
    <>
      <div className="dropdown dropdown-bottom dropdown-end ">
        <div tabIndex={0} role="button" className="btn m-1 btn-ghost " onClick={() => setIsMenuOpen(true)}>
          <VscKebabVertical />
        </div>
        {isMenuOpen && (
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-100 rounded-box w-52 p-2 shadow z-30"
          >
            <li onClick={() => copyUrl(whatMenu, id)}>
              <a>URL 복사하기</a>
            </li>
            <li
              onClick={() => {                
                addFavorite();
              }}
              className={
                whatMenu === "로드맵" || whatMenu === "북마크" ? "hidden" : ""
              }
            >
              {/* 내 즐겨찾기에 있는지 유무 따져서 즐겨찾기 삭제로 출력해주기 */}
              <a>즐겨찾기</a>
            </li>
            <li
              onClick={() => {
                setIsScrapModalOpen(true);
                addScrap();
              }}
              className={whatMenu === "로드맵" ? "" : "hidden"}
            >
              <a>스크랩</a>
            </li>
            <li
              onClick={() => {
                setIsReportModalOpen(true);
              }}
              className={whatMenu === "로드맵" ? "hidden" : ""}
            >
              <a>신고하기</a>
            </li>
          </ul>
        )}
      </div>

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
