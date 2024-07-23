import { FaSignOutAlt } from 'react-icons/fa';
import { navStore } from '../../stores/navStore';

const LogoutButton = () => {
  const logout = navStore(state => state.logout);

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
