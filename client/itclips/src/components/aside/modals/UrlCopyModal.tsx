// UrlCopyModal.tsx 는 AsideBookmarkList.tsx 에서 더보기 메뉴의 'url복사' 버튼을 눌렀을 때 출려되는 컴포넌트

import React from 'react';

interface UrlCopyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const UrlCopyModal: React.FC<UrlCopyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg">클립보드에 복사되었습니다.</h3>
        <div className="modal-action">
          <button className="btn" onClick={onClose}>확인</button>
        </div>
      </div>
    </div>
  );
};

export default UrlCopyModal;