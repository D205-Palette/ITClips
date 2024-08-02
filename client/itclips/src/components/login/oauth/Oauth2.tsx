import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authStore } from '../../../stores/authStore';

export default function Oauth2() {
  // const = authStore
  const [accessToken, setAccessToken] = useState('');
  const [userId, setUserId] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // 현재 URL에서 쿼리 파라미터 파싱
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('accessToken');
    const id = urlParams.get('userId');
    
    console.log(token, id)
    if (token && id) {
      setAccessToken(token);
      setUserId(id);
      
      // 필요한 경우 로컬 스토리지에 저장
      localStorage.setItem('accessToken', token);
      localStorage.setItem('userId', id);

      // 인증이 완료된 후 원하는 페이지로 리디렉션
      
    } else {
      // 파라미터가 없을 경우의 예외 처리
      console.error('Access token or user ID is missing in the URL');
    }
  }, [navigate]);

  return (
    <div>
      <h2>OAuth2 Redirect Page</h2>
      <p>Access Token: {accessToken}</p>
      <p>User ID: {userId}</p>
    </div>
  );
}
