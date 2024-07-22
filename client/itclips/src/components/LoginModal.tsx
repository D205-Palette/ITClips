import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store';

const LoginModal = () => {
  const closeLoginModal = useStore(state => state.closeLoginModal);
  const navigate = useNavigate();

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeLoginModal();
    }
  };

  const handleSignUpClick = () => {
    navigate('/SignUpView');
    closeLoginModal();
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-base-100 p-8 rounded-lg shadow-lg relative w-[801px] h-[654px]">
        <h2 className="text-3xl font-semibold mb-6 text-center">로그인</h2>
        <form className="space-y-4">
          <div className="form-control">
            <label htmlFor="username" className="label">
              <span className="label-text">아이디</span>
            </label>
            <input
              type="text"
              id="username"
              name="username"
              required
              className="input input-bordered"
              placeholder="아이디를 입력해주세요."
            />
          </div>
          <div className="form-control">
            <label htmlFor="password" className="label">
              <span className="label-text">비밀번호</span>
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              className="input input-bordered"
              placeholder="비밀번호를 입력해주세요."
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary w-full"
          >
            로그인
          </button>
        </form>
        <div className="flex justify-between mt-4">
          <button className="btn btn-link" onClick={() => console.log('아이디 찾기')}>아이디 찾기</button>
          <button className="btn btn-link" onClick={() => console.log('비밀번호 찾기')}>비밀번호 찾기</button>
          <button className="btn btn-link" onClick={handleSignUpClick}>회원가입</button>
        </div>
        <button
          onClick={closeLoginModal}
          className="absolute top-2 right-2 btn btn-ghost"
        >
          ×
        </button>


      </div>
    </div>
  );
};

export default LoginModal;
