import { FaSignOutAlt } from "react-icons/fa";
import { authStore } from "../../stores/authStore";
import { useNavigate } from "react-router-dom";
import { logoutApi } from "../../api/authApi";

const LogoutButton = () => {
  const navigate = useNavigate();
  const { logout, token } = authStore();

  const logoutButton = () => {
    logoutApi()
      .then((response) => {
        window.alert("로그아웃 완료");
        logout(); // 로그인 현재 상태 로그아웃으로 변경
      })
      .catch((error) => {
        window.alert("로그아웃 실패");
      });
    navigate("/login");
  };

  return (
    <div>
      <button
        onClick={logoutButton}
        className="transition-colors duration-300"
        aria-label="Logout"
      >
        <FaSignOutAlt />
      </button>
    </div>
  );
};

export default LogoutButton;
