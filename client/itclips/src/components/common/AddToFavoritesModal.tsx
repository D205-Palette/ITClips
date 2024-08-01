// AddToFavoritesModal.tsx 는 케밥 더보기 메뉴의 '즐겨찾기' 버튼을 눌렀을 때 출력되는 컴포넌트
// 기능 구현은 상위 컴포넌트에서 하시요
// 요건 안내 메세지 띄우는 용도로만

import React from 'react';

interface AddToFavModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const UrlCopyModal: React.FC<AddToFavModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg">즐겨찾기에 추가되었습니다.</h3>
        <div className="modal-action">
          <button className="btn" onClick={onClose}>확인</button>
        </div>
      </div>
    </div>
  );
};

export default UrlCopyModal;