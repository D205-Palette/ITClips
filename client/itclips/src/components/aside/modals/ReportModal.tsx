// ReportModal.tsx 는 AsideBookmarkList.tsx 에서 더보기 메뉴의 '신고하기' 버튼을 눌렀을 때 출력되는 컴포넌트

import React, { useState } from "react";

// components
import ReportConfirmModal from "./ReportConfirmModal";
import axios from "axios";
import { API_BASE_URL } from "../../../config";
interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  whatContent: string;
  id: number;
}

const ReportModal: React.FC<ReportModalProps> = ({
  isOpen,
  onClose,
  whatContent,
  id,
}) => {
  const [reportType, setReportType] = useState<string>("");
  const [reportContent, setReportContent] = useState<string>("");
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] =
    useState<boolean>(false);

  if (!isOpen) return null;

  // 임시값이고 나중에 스토리지에서 받아와야됨
  const userId = 1;
  const handleReport = () => {
    // 신고 처리 API
    if (whatContent === "북마크") {
      axios.post(`${API_BASE_URL}/api/report/bookmark/${userId}/${id}`);
    } else {
      axios.post(`${API_BASE_URL}/api/report/list/${userId}/${id}`);
    }

    // 신고 처리 후 확인 모달
    setIsConfirmationModalOpen(true);
  };

  const handleConfirmationClose = () => {
    setIsConfirmationModalOpen(false);
    onClose(); // 신고 모달 전부 닫기
  };

  return (
    <>
      <div className="modal modal-open">
        <div className="modal-box">
          <h3 className="font-bold text-lg">신고하기</h3>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">신고내역</span>
            </label>
            <select
              className="select select-bordered"
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
            >
              <option disabled value="">
                선택해주세요
              </option>
              <option value="spam">스팸</option>
              <option value="inappropriate">부적절한 내용</option>
              <option value="copyright">저작권 침해</option>
            </select>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">신고내용</span>
            </label>
            <textarea
              className="textarea textarea-bordered h-24 resize-none"
              value={reportContent}
              onChange={(e) => setReportContent(e.target.value)}
            ></textarea>
          </div>
          <div className="modal-action">
            <button className="btn" onClick={onClose}>
              취소
            </button>
            <button className="btn btn-primary" onClick={handleReport}>
              신고하기
            </button>
          </div>
        </div>
      </div>
      <ReportConfirmModal
        isOpen={isConfirmationModalOpen}
        onClose={handleConfirmationClose}
      />
    </>
  );
};

export default ReportModal;
