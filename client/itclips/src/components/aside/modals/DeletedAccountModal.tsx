import React from "react";
import { useNavigate } from "react-router-dom";

interface AccountDeletedModalProps {
  isOpen: boolean;
  onDeleteModalClose: () => void;
  onDeletedModalClose: () => void;
}

const DeletedAccountModal: React.FC<AccountDeletedModalProps> = ({ isOpen, onDeleteModalClose, onDeletedModalClose }) => {
  
    const navigete = useNavigate();

    // 회원탈퇴 후 모든 모달창을 닫고 첫 페이지로 리다이렉트
    const allClose = () => {
        onDeleteModalClose();
        onDeletedModalClose();
        navigete("/intro");
    }

    if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-center">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">회원 탈퇴 완료</h2>
        <div className="mb-6">
          <p className="text-gray-600">
            회원 탈퇴가 성공적으로 처리되었습니다. 
            그동안 서비스를 이용해 주셔서 감사합니다.
          </p>
        </div>
        <div className="mt-4">
          <p className="text-sm text-gray-500 mb-4">
            개인정보 및 서비스 이용 기록은 관련 법령에 따라 처리되었습니다.
          </p>
        </div>
        <button
          onClick={allClose}
          className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default DeletedAccountModal;