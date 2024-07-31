import { FaSignOutAlt } from 'react-icons/fa';
import { authStore } from '../../stores/authStore';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const navigate = useNavigate()
  const { logout } = authStore()

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
