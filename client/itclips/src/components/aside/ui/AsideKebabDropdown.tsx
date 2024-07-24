// AsideKebabDropdown.tsx 는 aside 컴포넌트의 더보기 메뉴

import { useState } from 'react';

// icons
import { VscKebabVertical } from "react-icons/vsc";

// components
import BookmarkListEditModal from "../modals/BookmarkListEditModal";
import DeleteBookmarkListModal from "../modals/DeleteBookmarkListModal";
import UrlCopyModal from "../modals/UrlCopyModal";
import ReportModal from "../modals/ReportModal";

const AsideKebabDropdown = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isUrlCopyModalOpen, setIsUrlCopyModalOpen] = useState<boolean>(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState<boolean>(false);

  const handleEdit = () => {
    setIsEditModalOpen(true);
  };

  const handleDelete = () => {
    setIsDeleteModalOpen(true);
  };

  const handleCopyUrl = () => {
    setIsUrlCopyModalOpen(true);
  };

  const handleReport = () => {
    setIsReportModalOpen(true);
  };

  return (
    <>
      <details className="dropdown dropdown-end dropdown-bottom self-end">
        <summary className="btn btn-ghost btn-circle">
          <VscKebabVertical />
        </summary>
        <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
          <li>
            <a className="justify-center" onClick={handleEdit}>수정하기</a>
          </li>
          <li>
            <a className="justify-center" onClick={handleDelete}>삭제하기</a>
          </li>
          <li>
            <a className="justify-center" onClick={handleCopyUrl}>url복사</a>
          </li>
          <li>
            <a className="justify-center" onClick={handleReport}>신고하기</a>
          </li>
        </ul>
      </details>
      <BookmarkListEditModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} />
      <DeleteBookmarkListModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} />
      <UrlCopyModal isOpen={isUrlCopyModalOpen} onClose={() => setIsUrlCopyModalOpen(false)} />
      <ReportModal isOpen={isReportModalOpen} onClose={() => setIsReportModalOpen(false)} />
    </>
  );
};

export default AsideKebabDropdown;