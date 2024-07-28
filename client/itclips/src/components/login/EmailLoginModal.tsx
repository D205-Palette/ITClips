import React, { useState } from 'react';
import { navStore } from '../../stores/navStore';
import { useNavigate } from 'react-router-dom';

const EmailLoginModal: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { toggleEmailLogin, togglePasswordReset } = navStore();

  const handleEmailLogin = () => {
    // 이메일 로그인 로직 구현
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-xl font-bold mb-4">Email Login</h2>
        <input
          type="email"
          placeholder="Email"
          className="input input-bordered w-full mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="input input-bordered w-full mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="btn btn-primary w-full mb-2"
          onClick={handleEmailLogin}
        >
          Login
        </button>
        <button
          className="btn btn-link w-full mb-2"
          onClick={togglePasswordReset}
        >
          Forgot Password?
        </button>
        <button
          className="btn btn-link w-full"
          onClick={() => navigate('/signup')}
        >
          Sign Up
        </button>
        <button
          className="btn btn-secondary w-full mt-4"
          onClick={toggleEmailLogin}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default EmailLoginModal;
