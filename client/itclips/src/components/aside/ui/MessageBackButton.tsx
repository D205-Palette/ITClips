// MessageBackButton.tsx 는 메세지창에서 사용되는 뒤로가기 버튼

// icons
import { IoIosArrowBack } from "react-icons/io";

const MessageBackButton = ({ onBack }: any) => {
  return (
    <button className="btn btn-ghost btn-circle" onClick={onBack}>
      <IoIosArrowBack />
    </button>
  );
};

export default MessageBackButton;