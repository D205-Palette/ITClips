// MessageBackButton.tsx 는 메세지창에서 사용되는 뒤로가기 버튼

// icons
import { BiArrowBack } from "react-icons/bi";

const MessageBackButton = ({ onBack }: any) => {
  return (
    <button className="btn btn-ghost btn-circle" onClick={onBack}>
      <BiArrowBack />
    </button>
  );
};

export default MessageBackButton;