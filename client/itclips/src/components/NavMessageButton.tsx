import { FaEnvelope } from 'react-icons/fa';
import { asideStore } from "../stores/asideStore";

const MessageButton = () => {       

  const toggleMessage = asideStore(state => state.toggleMessage);

  return (
    <button onClick={toggleMessage} className="transition-colors duration-300 hover:text-gray-400"><FaEnvelope /></button>
    // <a href="" >
  );
};

export default MessageButton;
