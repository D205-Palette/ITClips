// DeleteBookmarkListModal.tsx 는 AsideBookmarkList.tsx 에서 더보기 메뉴의 '삭제하기' 버튼을 눌렀을 때 출력되는 컴포넌트

import React from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../../config';


interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  // 삭제할게 북마크인지 리스트인지 로드맵인지 구분용
  whatContent : string;
  id:number;
  // 로드맵 스탭 삭제할때 필요한 stepId
  stepId?:number
}

const DeleteContentModal: React.FC<DeleteConfirmModalProps> = ({ isOpen, onClose,whatContent,id,stepId }) => {
  if (!isOpen) return null;

  // 임시이긴한데 스토리지에 박아둔 값 가져와서 할 예정
  // 아니면 필요한 곳에서먄 ?치고 prop때려도 ㄱㅊ
  const userId = 1

  function deleteApi ():void {
    if(whatContent==='리스트'){
    axios.delete(`${API_BASE_URL}/api/list/delete/${userId}/${id}`)
    } else if(whatContent==='북마크'){
      axios.delete(`${API_BASE_URL}/api/bookmark/delete/${id}`)
    } else if (whatContent==='즐겨찾기'){
      axios.delete(`${API_BASE_URL}/api/list/scrap/${id}`)
    } else if (whatContent==='로드맵'){
      axios.delete(`${API_BASE_URL}/api/roadmap/${id}/${userId}`)
    }
  }


  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg">삭제하시겠습니까?</h3>
        <div className="modal-action">
          <button className="btn" onClick={onClose}>아니오</button>
          <button className="btn btn-primary" onClick={() => {
            // 삭제 로직 구현
            deleteApi()
            onClose();
          }}>예</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteContentModal;