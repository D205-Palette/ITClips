import { VscKebabVertical } from "react-icons/vsc";
import { FC, useState } from "react";
import FavoriteConfirmationModal from "../aside/modals/FavoriteConfirmModal";
import ReportModal from "../aside/modals/ReportModal";
import UrlCopyModal from "../common/UrlCopyModal";
import ScrapConfirmationModal from "../aside/modals/ScrapComfirmModal";
import axios from "axios";
import { API_BASE_URL } from "../../config";
import { authStore } from "../../stores/authStore";

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

  // 즐겨찾기 추가
  function addFavorite(): void {
    axios.post(`${API_BASE_URL}/api/list/scrap/${userId}/${id}`,
      {},
      {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  // 로드맵 스크랩
  function addScrap(): void {
    axios.post(`${API_BASE_URL}/api/roadmap/scrap/${id}/${userId}`,
      {},
      {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
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
          {/* 이구간은 내꺼 남꺼일때& 즐겨찾기일떄 유무 */}
          <li onClick={() => setIsUrlCopyModalOpen(true)}>
            <a>URL 복사하기</a>
          </li>
          <li
            onClick={() => {
              setIsFavoriteModalOpen(true);
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
          onClick={()=>{setIsScrapModalOpen(true); addScrap()}}
          className={whatMenu === "로드맵" ? "" : "hidden"}>
            <a>스크랩</a>
          </li>
          <li
          onClick={()=>{setIsReportModalOpen(true);}}
          className={whatMenu === "로드맵" ? "hidden" : ""}>
            <a>신고하기</a>
          </li>
        </ul>
      </div>

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
