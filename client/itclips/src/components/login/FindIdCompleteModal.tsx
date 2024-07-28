import React from "react";
import { navStore } from "../../stores/navStore";

// Props 인터페이스 정의
interface FindIdCompleteModalProps {
  FindedId: string;
  setUserId: React.Dispatch<React.SetStateAction<string>>;
}

const FindIdCompleteModal: React.FC<FindIdCompleteModalProps> = ({
  FindedId,
  setUserId,
}) => {
  // const { modalState } = navStore();
  // const { openFindPasswordModal, closeFindIdModal, openLoginModal } = modalState;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setUserId('')
    }
  };

  const toLogin = () => {
    // closeFindIdModal()
    setUserId('')
  }

  const closeModal = () => {
    
    setUserId('')
  }

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-base-100 p-8 rounded-lg shadow-lg relative w-[801px] h-[654px]">
        <h1 className="text-3xl font-semibold mb-6 text-center">
          인증이 완료되었습니다. 아이디를 안내드립니다.
        </h1>

        <button className="btn " 
        // onClick={openFindPasswordModal}
        >
          비밀번호 찾기
        </button>

        <button className="btn " onClick={toLogin}>
          로그인 하러 가기
        </button>

        <div>{FindedId}</div>   

        <button
          onClick={closeModal}
          className="absolute top-2 right-2 btn btn-ghost"
        >
          ×        
        </button>

      </div>
    </div>
  );
};

export default FindIdCompleteModal;
