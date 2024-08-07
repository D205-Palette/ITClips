// ReportComfirmModal.tsx 는 ReportModal.tsx(북마크리스트 신고하기 모달) 에서 신고하기 버튼을 누른 후 출력되는 컴포넌트

import React from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../../config';
import { authStore } from '../../../stores/authStore';
interface FavoriteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  id:number;
}

const FavoriteDeleteModal: React.FC<FavoriteConfirmationModalProps> = ({ isOpen, onClose,id}) => {
const {userId, token} = authStore()

const deleteFavorite  = () => {
    // axios({
    //     url:,
    //     method:,
    //     params:, 
    // })
}
  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg">즐겨찾기에서 삭제하시겠습니까?</h3>
        <div className="modal-action">
          <button className="btn" onClick={onClose}>확인</button>
          <button className="btn" onClick={onClose}>취소</button>
        </div>
      </div>
    </div>
  );
};

export default FavoriteDeleteModal;
