import { FaPlus } from "react-icons/fa6";
import { useRef, RefObject } from 'react';

const MessageInviteButton = () => {
  const modalRef: RefObject<HTMLDialogElement> = useRef(null);

  const openModal = () => {
    modalRef.current?.showModal();
  };

  return (
    <div>
      {/* 초대 버튼 */}
      <button className="btn btn-ghost btn-circle" onClick={openModal}>
        <FaPlus />
      </button>
      {/* 모달 영역 */}
      <dialog ref={modalRef} className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <h3 className="font-bold text-lg">초대하기</h3>
          <div className="modal-action">
            {/* 대화상대 초대 */}
            <form method="dialog" className="flex items-center w-full">
              <input type="text" placeholder="초대할 상대의 이름을 입력해주세요." className="input input-bordered flex-grow mr-2" />
              <button className="btn flex-shrink-0">초대</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default MessageInviteButton;
