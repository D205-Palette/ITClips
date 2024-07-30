import { useState,FC } from 'react';
import { VscKebabVertical } from "react-icons/vsc";
import BookmarkListEditModal from "../modals/BookmarkListEditModal";
import DeleteBookmarkListModal from "../modals/DeleteBookmarkListModal";
import UrlCopyModal from "../modals/UrlCopyModal";
import ReportModal from "../modals/ReportModal";

interface Props {
  isRoadmap : boolean
}

const AsideKebabDropdown :FC<Props> = (isRoadmap) => {
  const [ isEditModalOpen, setIsEditModalOpen ] = useState<boolean>(false);
  const [ isDeleteModalOpen, setIsDeleteModalOpen ] = useState<boolean>(false);
  const [ isUrlCopyModalOpen, setIsUrlCopyModalOpen ] = useState<boolean>(false);
  const [ isReportModalOpen, setIsReportModalOpen ] = useState<boolean>(false);

  const [ isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const toggleDropdown = (): void => setIsDropdownOpen(!isDropdownOpen);

  const categories: string[] = (isRoadmap.isRoadmap? ["수정하기", "삭제하기", "url복사"]: ["수정하기", "삭제하기", "url복사", "신고하기"])

  const handleMenu = (menu: string) => {
    if (menu === "수정하기") {
      setIsEditModalOpen(true);
    } else if (menu === "삭제하기") {
      setIsDeleteModalOpen(true);
    } else if (menu === "url복사") {
      setIsUrlCopyModalOpen(true);
    } else if (menu === "신고하기") {
      setIsReportModalOpen(true);
    }
    setIsDropdownOpen(false);
  };

  return (
    <div className="self-end flex justify-end relative">
      <button
        id="dropdownDefaultButton"
        onClick={toggleDropdown}
        className="btn btn-ghost btn-circle text-center"
        type="button"
      >
        <VscKebabVertical />
      </button>

      {/* 드롭다운 메뉴 추가 */}
      {isDropdownOpen && (
        <div className="absolute right-0 top-full mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 z-10"> {/* right-0과 top-full 추가 */}
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
            {categories.map((category) => (
              <li key={category} onClick={() => handleMenu(category)}>
                <a href="#" className="text-center block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                  {category}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
      <BookmarkListEditModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} />
      <DeleteBookmarkListModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} />
      <UrlCopyModal isOpen={isUrlCopyModalOpen} onClose={() => setIsUrlCopyModalOpen(false)} />
      <ReportModal isOpen={isReportModalOpen} onClose={() => setIsReportModalOpen(false)} />
    </div>
  );
};

export default AsideKebabDropdown;