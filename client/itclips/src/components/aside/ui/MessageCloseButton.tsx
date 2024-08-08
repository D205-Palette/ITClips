// MessageBackButton.tsx 는 메세지창에서 사용되는 뒤로가기 버튼

// icons
import { RiCloseLargeFill } from "react-icons/ri";

const MessageCloseButton = ({ onBack }: any) => {
  return (
    <button className="btn btn-ghost btn-circle" onClick={onBack}>
      <RiCloseLargeFill />
    </button>
  );
};

export default MessageCloseButton;