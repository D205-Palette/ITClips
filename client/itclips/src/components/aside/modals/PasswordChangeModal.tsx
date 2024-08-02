import React, { useState } from 'react';

interface PasswordChangeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (oldPassword: string, newPassword: string) => void;
  validateOldPassword: (password: string) => Promise<boolean>;
}

const PasswordChangeModal: React.FC<PasswordChangeModalProps> = ({ isOpen, onClose, onSubmit, validateOldPassword }) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // 기존 비밀번호 확인
    const isOldPasswordValid = await validateOldPassword(oldPassword);
    if (!isOldPasswordValid) {
      setError('기존 비밀번호가 올바르지 않습니다.');
      return;
    }

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
    onSubmit(oldPassword, newPassword);
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setError('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
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