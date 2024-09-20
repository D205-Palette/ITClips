import { FaSignOutAlt } from "react-icons/fa";
import { authStore } from "../../stores/authStore";
import { useNavigate } from "react-router-dom";
import { logoutApi } from "../../api/authApi";
import toastStore from "../../stores/toastStore";

// stores
import { asideStore } from "../../stores/asideStore";

const LogoutButton = () => {
  const toggleMessage = asideStore((state) => state.toggleMessage);
  const isMessageOpen = asideStore((state) => state.isMessageOpen);
  const navigate = useNavigate();
  const { logout, token } = authStore();
  const { globalNotification, setGlobalNotification } = toastStore();
  const logoutButton = () => {
    logoutApi()
      .then((response) => {
        logout(); // 로그인 현재 상태 로그아웃으로 변경
        setGlobalNotification({
          message: `로그아웃 완료`,
          type: "success",
        });
      })
      .catch((error) => {
        setGlobalNotification({
          message: `로그아웃 실패`,
          type: "error",
        });
      });
    // 로그아웃 하면서 메세지창 닫기
    if (isMessageOpen) {
      toggleMessage();
    }
    navigate("/login");
  };

  return (
    <div>
      <button
        onClick={logoutButton}
        className="hover:text-sky-700 transition-colors duration-300"
        aria-label="Logout"
      >
        <FaSignOutAlt />
      </button>
    </div>
  );
};

export default LogoutButton;
