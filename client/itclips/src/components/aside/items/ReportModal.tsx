// ReportModal.tsx
import React, { useState } from 'react';
import ReportConfirmModal from './ReportConfirmModal';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ReportModal: React.FC<ReportModalProps> = ({ isOpen, onClose }) => {
  const [reportType, setReportType] = useState<string>('');
  const [reportContent, setReportContent] = useState<string>('');
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleReport = () => {
    // 여기에 신고 처리 로직을 구현합니다.
    // 예를 들어, API 호출 등을 수행할 수 있습니다.
    
    // 신고 처리 후 확인 모달을 엽니다.
    setIsConfirmationModalOpen(true);
  };

  const handleConfirmationClose = () => {
    setIsConfirmationModalOpen(false);
    onClose(); // 원래의 신고 모달도 닫습니다.
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
              <option disabled value="">선택해주세요</option>
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
              className="textarea textarea-bordered h-24" 
              value={reportContent}
              onChange={(e) => setReportContent(e.target.value)}
            ></textarea>
          </div>
          <div className="modal-action">
            <button className="btn" onClick={onClose}>취소</button>
            <button className="btn btn-primary" onClick={handleReport}>신고하기</button>
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