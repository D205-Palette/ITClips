import { FaSignOutAlt } from 'react-icons/fa';
import { useStore } from '../store';

const LogoutButton = () => {
  const logout = useStore(state => state.logout);

  return (
    <button
      onClick={logout}
      className="transition-colors duration-300"
      aria-label="Logout"
    >
      <FaSignOutAlt />
    </button>
  );
};

export default LogoutButton;
