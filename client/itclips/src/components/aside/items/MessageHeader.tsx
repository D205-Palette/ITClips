import { FaPlus } from "react-icons/fa";

const onClick = (event: any) => {
  alert("새 대화창으로 이동합니다.");
}

const MessageHeader = () => {
  return (
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-bold">메세지</h2>
      <button className="self-end btn btn-ghost btn-circle" onClick={onClick}>
        <FaPlus className="h-6 w-6" />
      </button>
    </div>
  );
};

export default MessageHeader;