// ReportComfirmModal.tsx 는 ReportModal.tsx(북마크리스트 신고하기 모달) 에서 신고하기 버튼을 누른 후 출력되는 컴포넌트

import React from 'react';

interface FavoriteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FavoriteConfirmationModal: React.FC<FavoriteConfirmationModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg">즐겨찾기에 추가 되었습니다.</h3>
        <div className="modal-action">
          <button className="btn" onClick={onClose}>확인</button>
        </div>
      </div>
    </div>
  );
};

export default FavoriteConfirmationModal;