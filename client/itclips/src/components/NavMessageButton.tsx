import { FaEnvelope } from 'react-icons/fa';
import { useStore } from '../stores/authStore';

const MessageButton = () => {       
  return (
    <a href="/SignUpView" className="transition-colors duration-300 hover:text-gray-400"><FaEnvelope /></a>
    // <a href="" >
  );
};

export default MessageButton;
