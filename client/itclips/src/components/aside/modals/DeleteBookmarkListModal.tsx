// DeleteBookmarkListModal.tsx 는 AsideBookmarkList.tsx 에서 더보기 메뉴의 '삭제하기' 버튼을 눌렀을 때 출력되는 컴포넌트

import React from 'react';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DeleteBookmarkListModal: React.FC<DeleteConfirmModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg">삭제하시겠습니까?</h3>
        <div className="modal-action">
          <button className="btn" onClick={onClose}>아니오</button>
          <button className="btn btn-primary" onClick={() => {
            // 삭제 로직 구현
            onClose();
          }}>예</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteBookmarkListModal;