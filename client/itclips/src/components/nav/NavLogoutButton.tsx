import { FaSignOutAlt } from 'react-icons/fa';
import { navStore } from '../../stores/navStore';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const navigate = useNavigate()
  const { logout } = navStore()

  const logoutButton = () => {
    logout()
    navigate('/login')
  } 
    

  return (
    <button
      onClick={logoutButton}
      className="transition-colors duration-300"
      aria-label="Logout"
    >
      <FaSignOutAlt />
    </button>
  );
};

export default LogoutButton;
