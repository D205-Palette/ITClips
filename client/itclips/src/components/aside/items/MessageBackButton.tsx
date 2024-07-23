import { IoIosArrowBack } from "react-icons/io";

const MessageBackButton = ({ onBack }: any) => {
  return (
    <button className="btn btn-ghost btn-circle" onClick={onBack}>
      <IoIosArrowBack />
    </button>
  );
};

export default MessageBackButton;