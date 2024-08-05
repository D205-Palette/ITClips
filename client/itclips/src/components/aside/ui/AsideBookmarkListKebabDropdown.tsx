import { FC, useState, useEffect, useRef } from 'react';

// icons
import { VscKebabVertical } from "react-icons/vsc";

// components
import BookmarkListEditModal from "../modals/BookmarkListEditModal";
import DeleteBookmarkListModal from "../modals/DeleteContentModal";
import UrlCopyModal from "../../common/UrlCopyModal";
import ReportModal from "../modals/ReportModal";
import FavoriteConfirmationModal from '../modals/FavoriteConfirmModal';
import ScrapConfirmationModal from '../modals/ScrapComfirmModal';

interface Props {
  isRoadmap : boolean
  id:number;
}

const AsideBookmarkListKebabDropdown :FC<Props> = (isRoadmap, id) => {
  const [ isEditModalOpen, setIsEditModalOpen ] = useState<boolean>(false);
  const [ isDeleteModalOpen, setIsDeleteModalOpen ] = useState<boolean>(false);
  const [ isUrlCopyModalOpen, setIsUrlCopyModalOpen ] = useState<boolean>(false);
  const [ isReportModalOpen, setIsReportModalOpen ] = useState<boolean>(false);
  const [ isFavoriteModalOpen, setIsFavoriteModalOpen ] = useState<boolean>(false);
  const [ isScrapModalOpen, setIsScrapModalOpen ] = useState<boolean>(false);

  const [ isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = (): void => setIsDropdownOpen(!isDropdownOpen);

  // 로드맵 or 북마크리스트
  const categories: string[] = (isRoadmap.isRoadmap? ["수정하기", "삭제하기", "url복사", '스크랩']: ["수정하기", "삭제하기", "url복사",'즐겨찾기', "신고하기"])
  const handleCopyClipBoard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setIsUrlCopyModalOpen(true)
    } catch (error) {
      console.log(error);
    }
  }


  const handleMenu = (menu: string) => {
    if (menu === "수정하기") {
      setIsEditModalOpen(true);
    } else if (menu === "삭제하기") {
      setIsDeleteModalOpen(true);
    } else if (menu === "url복사") {
      handleCopyClipBoard();
    } else if (menu === "신고하기") {
      setIsReportModalOpen(true);
    } else if (menu === '즐겨찾기'){
      setIsFavoriteModalOpen(true)
    } else if (menu === '스크랩'){
      setIsScrapModalOpen(true)
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
        <div className="absolute right-0 top-full mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 z-10">
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
            {categories.map((category) => (
              <li key={category} onClick={() => handleMenu(category)}>
                <div className="text-center block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                  {category}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      <BookmarkListEditModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} />
      <DeleteBookmarkListModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} whatContent='리스트' id={id}/>
      <UrlCopyModal isOpen={isUrlCopyModalOpen} onClose={() => setIsUrlCopyModalOpen(false)} />
      <ReportModal isOpen={isReportModalOpen} onClose={() => setIsReportModalOpen(false)} whatContent='리스트' id={id}/>
      <FavoriteConfirmationModal isOpen={isFavoriteModalOpen} onClose={() => setIsFavoriteModalOpen(false)}/>
      <ScrapConfirmationModal isOpen={isScrapModalOpen} onClose={() => setIsScrapModalOpen(false)}/>
    </div>
  );
};

export default AsideBookmarkListKebabDropdown;