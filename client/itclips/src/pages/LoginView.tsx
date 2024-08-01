import React, { useEffect } from 'react'
import { navStore } from '../stores/navStore'
import LoginListModal from "../components/login/modals/LoginListModal"
import EmailLoginModal from '../components/login/modals/EmailLoginModal';
import PasswordResetModal from "../components/login/modals/PasswordResetModal"

export default function LoginView() {  
  const { isLoginListOpen, isEmailLoginOpen, isPasswordResetOpen, setLoginListOpen, setEmailLoginOpen, setPasswordResetOpen } = navStore();

  useEffect(() => {
    setLoginListOpen(true);
    setEmailLoginOpen(false);
    setPasswordResetOpen(false);
  }, [setLoginListOpen, setEmailLoginOpen, setPasswordResetOpen]);

  return (
    <>
      {isLoginListOpen && <LoginListModal/>}          
      {isEmailLoginOpen && <EmailLoginModal/>}
      {isPasswordResetOpen && <PasswordResetModal/>}
    </>
  )
}

