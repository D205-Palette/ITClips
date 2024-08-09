import { FaEnvelope } from 'react-icons/fa';
import { asideStore } from '../../stores/asideStore';

const MessageButton = () => {       

  const toggleMessage = asideStore(state => state.toggleMessage);

  return (
    <button onClick={toggleMessage} className="hover:text-sky-700 transition-colors duration-300"><FaEnvelope /></button>
    // <a href="" >
  );
};

export default MessageButton;
