import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// stores
import { authStore } from "../../../stores/authStore";

interface DeleteAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
}

const DeleteAccountModal: React.FC<DeleteAccountModalProps> = ({ isOpen, onClose, onConfirm }) => {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isDeletedModalOpen, setIsDeletedModalOpen] = useState(false);
  const navigate = useNavigate();
  const logout = authStore(state => state.logout);

  const handleConfirm = async () => {
    if (isConfirmed) {
      try {
        await onConfirm();
        setIsDeletedModalOpen(true);
      } catch (error) {
        console.error("회원 탈퇴 중 오류 발생:", error);
        // 에러 발생 시 사용자에게 알림
        alert("회원 탈퇴 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
      }
    }
  };

  const handleDeletedModalClose = () => {
    setIsDeletedModalOpen(false);
    logout();
    navigate("/intro"); // 회원 탈퇴 완료 후 intro 페이지로 리다이렉트
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-30">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
          <h2 className="text-xl font-bold mb-4 text-red-600">회원 탈퇴 확인</h2>
          <div className="mb-6">
            <p className="mb-2">회원 탈퇴 시 다음과 같은 결과가 발생합니다:</p>
            <ul className="list-disc pl-5 mb-4 text-sm">
              <li>모든 개인 정보가 즉시 삭제됩니다.</li>
              <li>저장된 북마크와 설정이 모두 삭제됩니다.</li>
              <li>탈퇴 후에는 계정을 복구할 수 없습니다.</li>
            </ul>
            <p className="text-red-500 font-semibold">이 작업은 되돌릴 수 없습니다.</p>
          </div>
          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={isConfirmed}
                onChange={() => setIsConfirmed(!isConfirmed)}
                className="mr-2"
              />
              <span className="text-sm">위의 내용을 이해했으며, 회원 탈퇴에 동의합니다.</span>
            </label>
          </div>
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="mr-2 px-4 py-2 text-gray-600 bg-gray-200 rounded hover:bg-gray-300"
            >
              취소
            </button>
            <button
              onClick={handleConfirm}
              disabled={!isConfirmed}
              className={`px-4 py-2 text-white rounded ${
                isConfirmed ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-400 cursor-not-allowed'
              }`}
            >
              회원 탈퇴
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteAccountModal;