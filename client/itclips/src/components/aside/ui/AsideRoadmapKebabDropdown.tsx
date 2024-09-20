import { FC, useState, useEffect, useRef } from "react";

// icons
import { VscKebabVertical } from "react-icons/vsc";

// components
import DeleteContentModal from "../modals/DeleteContentModal";
import UrlCopyModal from "../../common/UrlCopyModal";
import ReportModal from "../modals/ReportModal";
import FavoriteConfirmationModal from "../modals/FavoriteConfirmModal";
import ScrapConfirmationModal from "../modals/ScrapComfirmModal";
import { useNavigate } from "react-router-dom";

import { authStore } from "../../../stores/authStore";
interface Props {
  isRoadmap: boolean;
  id: number;
}

const AsideRoadmapKebabDropdown: FC<Props> = ({ isRoadmap, id }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isUrlCopyModalOpen, setIsUrlCopyModalOpen] = useState<boolean>(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState<boolean>(false);
  const [isFavoriteModalOpen, setIsFavoriteModalOpen] =
    useState<boolean>(false);
  const [isScrapModalOpen, setIsScrapModalOpen] = useState<boolean>(false);

  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const { userId } = authStore();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = (): void => setIsDropdownOpen(!isDropdownOpen);

  // 로드맵 or 북마크리스트
  const categories: string[] = isRoadmap
    ? ["수정하기", "삭제하기", "url복사", "스크랩"]
    : ["수정하기", "삭제하기", "url복사", "즐겨찾기", "신고하기"];
  const handleCopyClipBoard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setIsUrlCopyModalOpen(true);
    } catch (error) {}
  };

  const handleMenu = (menu: string) => {
    if (menu === "수정하기") {
      if (isRoadmap) {
        navigate(`/roadmap/${id}/edit`);
      } else {
        setIsEditModalOpen(true);
      }
    } else if (menu === "삭제하기") {
      setIsDeleteModalOpen(true);
    } else if (menu === "url복사") {
      handleCopyClipBoard();
    } else if (menu === "신고하기") {
      setIsReportModalOpen(true);
    } else if (menu === "즐겨찾기") {
      setIsFavoriteModalOpen(true);
    } else if (menu === "스크랩") {
      setIsScrapModalOpen(true);
    }
    setIsDropdownOpen(false);
  };

  return (
    <div className="self-end flex justify-end relative" ref={dropdownRef}>
      <button
        id="dropdownDefaultButton"
        onClick={toggleDropdown}
        className="btn btn-ghost btn-circle text-center"
        type="button"
      >
        <VscKebabVertical />
      </button>

      {isDropdownOpen && (
        <div className="absolute right-0 top-full mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 z-10">
          <ul className="py-2 text-sm text-gray-700">
            <li className={userId === id ? "" : "hidden"} onClick={()=>navigate(`/roadmap/${id}/edit`)}>
              <a>수정하기</a>
            </li>
            <li className={userId === id ? "" : "hidden"} onClick={()=>setIsDeleteModalOpen(true)}>
              <a>삭제하기</a>
            </li>
            <li >
              <a>url 복사</a>
            </li>
            <li className={userId? "" : "hidden"}>
              <a>스크랩</a>
            </li>
          </ul>
        </div>
      )}
     
      {isDeleteModalOpen && (
        <DeleteContentModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          whatContent="로드맵"
          id={id}
        />
      )}
      <UrlCopyModal
        isOpen={isUrlCopyModalOpen}
        onClose={() => setIsUrlCopyModalOpen(false)}
      />
      <ReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        whatContent="로드맵"
        id={id}
      />
      <FavoriteConfirmationModal
        isOpen={isFavoriteModalOpen}
        onClose={() => setIsFavoriteModalOpen(false)}
      />
      <ScrapConfirmationModal
        isOpen={isScrapModalOpen}
        onClose={() => setIsScrapModalOpen(false)}
      />
    </div>
  );
};

export default AsideRoadmapKebabDropdown;
