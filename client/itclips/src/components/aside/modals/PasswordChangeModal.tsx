import React, { useState } from "react";
import { AxiosError } from 'axios';

// stores
import { authStore } from "../../../stores/authStore";

// apis
import { changePassword } from "../../../api/profileApi";

interface NotificationType {
  message: string;
  type: 'success' | 'error';
};

interface PasswordChangeModalProps {
  isOpen: boolean;
  onClose: () => void;
  setNotification: (notification: NotificationType) => void;
}

const PasswordChangeModal: React.FC<PasswordChangeModalProps> = ({ isOpen, onClose, setNotification }) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const userInfo = authStore(state => state.userInfo);

  // 비밀번호 변경 모달 로직
  const handlePasswordChange = async (oldPassword: string, newPassword: string): Promise<boolean> => {
    if (userInfo.email) {
      try {
        const response = await changePassword(userInfo.email, oldPassword, newPassword);
        if (response.status === 200) {          
          setNotification({ message: "비밀번호가 성공적으로 변경되었습니다.", type: 'success' });
          return true; // 성공적으로 변경됨
        } else {
          throw new Error('비밀번호 변경 실패');
        }
      } catch (error) {
        const axiosError = error as AxiosError;
  
        // 400 에러일 경우
        if (axiosError.response) {
          if (axiosError.response.status === 400) {
            console.error('기존 비밀번호가 일치하지 않습니다.');
            setNotification({ message: "기존 비밀번호가 일치하지 않습니다.", type: 'error' });
          } else {
            console.error('비밀번호 변경 중 오류가 발생했습니다:', axiosError);
            setNotification({ message: "비밀번호 변경에 실패했습니다.", type: 'error' });
          }
        } else {
          console.error('비밀번호 변경 중 오류가 발생했습니다:', axiosError);
          setNotification({ message: "비밀번호 변경에 실패했습니다.", type: 'error' });
        }
        return false; // 실패
      }
    } else {
      console.error('사용자 이메일이 없습니다.');
      setNotification({ message: "사용자 이메일이 없습니다.", type: 'error' });
      return false; // 이메일이 없으면 실패
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (newPassword !== confirmPassword) {
      setError('새 비밀번호가 일치하지 않습니다.');
      return;
    }
    if (newPassword.length < 8) {
      setError('새 비밀번호는 8자 이상이어야 합니다.');
      return;
    }
    if (oldPassword === newPassword) {
      setError('새 비밀번호는 기존 비밀번호와 달라야 합니다.');
      return;
    }

    const isPasswordChanged = await handlePasswordChange(oldPassword, newPassword); // 비동기 함수 호출
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setError('');
    if (isPasswordChanged) {
      onClose(); // 모달 닫기
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-30">
      <div className="bg-base-100 rounded-lg p-6 w-96">
        <h2 className="text-xl font-bold mb-4">비밀번호 변경</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="oldPassword" className="block mb-2">기존 비밀번호</label>
            <input
              type="password"
              id="oldPassword"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="newPassword" className="block mb-2">새 비밀번호</label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block mb-2">새 비밀번호 확인</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="btn mr-2 px-4 py-2 text-gray-600 bg-gray-200 rounded hover:bg-gray-300"
            >
              취소
            </button>
            <button
              type="submit"
              className="btn px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
            >
              비밀번호 변경
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordChangeModal;