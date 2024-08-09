import React, { useEffect, useMemo } from "react";
import { FaBell, FaTimes, FaCheck } from "react-icons/fa";

// stores
import notificationStore from "../../stores/notificationStore";
import { authStore } from "../../stores/authStore";

const NotificationDropdown: React.FC = () => {

  const { notifications, fetchNotifications, markAllAsRead, deleteNotification } = notificationStore();
  const userId = authStore(state => state.userId);

  useEffect(() => {
    if (userId) {
      fetchNotifications(userId);
    }
  }, [userId, fetchNotifications]);

  const handleMarkAllAsRead = () => {
    if (userId) {
      markAllAsRead(userId);
    }
  };

  const handleDelete = (event: React.MouseEvent, notificationId: number) => {
    event.stopPropagation();
    event.preventDefault();   // 삭제버튼 누른후 알림창 닫히지 않도록
    deleteNotification(notificationId);
  };

  const unreadCount = useMemo(() => {
    return notifications.filter(notification => !notification.read).length;
  }, [notifications]);

  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-circle">
        <div className="indicator">
          <FaBell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="badge badge-sm badge-error indicator-item rounded-full w-2 h-2 p-0">{unreadCount}</span>
          )}
        </div>
      </label>
      <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content w-80 bg-base-100 shadow">
        <div className="card-body">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-lg">알림</h3>
            {unreadCount > 0 && (
              <button onClick={handleMarkAllAsRead} className="btn btn-xs btn-ghost">
                <FaCheck className="mr-1" /> 모두 읽음
              </button>
            )}
          </div>
          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <p className="text-center py-2">알림이 없습니다.</p>
            ) : (
              <ul>
                {notifications.map((notification) => (
                  <li key={notification.id} className={`flex justify-between items-center py-2 border-b ${notification.read ? 'text-gray-400' : ''}`}>
                    <span className="text-sm">{notification.contents}</span>
                    <button
                      onClick={(event) => handleDelete(event, notification.id)}
                      className="btn btn-ghost btn-xs"
                    >
                      <FaTimes />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationDropdown;