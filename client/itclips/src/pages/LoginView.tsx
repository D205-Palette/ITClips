import React, { useEffect } from 'react'
import { navStore } from '../stores/navStore'
import LoginListModal from "../components/login/LoginListModal"
import EmailLoginModal from '../components/login/EmailLoginModal';
import PasswordResetModal from "../components/login/PasswordResetModal"

export default function LoginView() {  
  const { isLoginListOpen, isEmailLoginOpen, isPasswordResetOpen, setLoginListOpen, setEmailLoginOpen, setPasswordResetOpen } = navStore();

  useEffect(() => {
    setLoginListOpen(true);
    setEmailLoginOpen(false);
    setPasswordResetOpen(false);
  }, [setLoginListOpen, setEmailLoginOpen, setPasswordResetOpen]);

  return (
    <div>
      {isLoginListOpen && <LoginListModal/>}          
      {isEmailLoginOpen && <EmailLoginModal/>}
      {isPasswordResetOpen && <PasswordResetModal/>}
    </div>
  )
}

