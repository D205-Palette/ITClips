// 여긴 북마크 삭제 확인 모달

import React from 'react';
import axios from 'axios';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookmarkId : number;
}

const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({ isOpen, onClose, bookmarkId }) => {
  if (!isOpen) return null;

  function deleteBookmark():void {
    //   /bookmark/delete/{bookmarkId} 로 delete 호출
    // axios.delete(`${BASE_URL}/bookmark/delete/${bookmarkId}`)
    onClose()
  }

          
  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg">삭제하시겠습니까?</h3>
        <div className="modal-action">
          <button className="btn" onClick={onClose}>아니오</button>
          <button className="btn btn-primary" onClick={() => {
            deleteBookmark();
            
          }}>예</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;