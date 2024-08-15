// ReportComfirmModal.tsx 는 ReportModal.tsx(북마크리스트 신고하기 모달) 에서 신고하기 버튼을 누른 후 출력되는 컴포넌트

import React from 'react';
import { IoIosWarning } from "react-icons/io";

interface ReportConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void
}

const ReportErrorModal: React.FC<ReportConfirmationModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <div className='flex flex-row items-center ms-10 mt-5'>
        <IoIosWarning color='red' size={28}/>
        <h3 className="ms-3 font-bold text-lg">이미 접수된 신고입니다.</h3>
        </div>
        <div className="modal-action">
          <button className="btn" onClick={onClose}>확인</button>
        </div>
      </div>
    </div>
  );
};

export default ReportErrorModal;