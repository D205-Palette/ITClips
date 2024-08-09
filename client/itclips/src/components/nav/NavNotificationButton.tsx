import React, { useState, useEffect, useRef, useMemo } from "react";

// icons
import { FaBell, FaTimes, FaCheck } from "react-icons/fa";

// stores
import notificationStore from "../../stores/notificationStore";
import { authStore } from "../../stores/authStore";

const NotificationDropdown: React.FC = () => {

  const userId = authStore(state => state.userId);

  const { notifications, fetchNotifications, markAllAsRead, deleteNotification } = notificationStore();
  const [ isOpen, setIsOpen ] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (!isOpen && unreadCount > 0) {
      handleMarkAllAsRead();
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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

  // 알림을 ID 기준으로 내림차순 정렬
  const sortedNotifications = useMemo(() => {
    return [...notifications].sort((a, b) => b.id - a.id);
  }, [notifications]);

  return (
    <div ref={dropdownRef} className={`dropdown dropdown-end ${isOpen ? 'dropdown-open' : ''} relative`}>
      <label tabIndex={0} onClick={handleToggle}>
        <div className="indicator">
          <FaBell className="transition-colors duration-300 hover:text-gray-400" />
          {unreadCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-3 w-3 flex items-center justify-center"></span>
          )}
        </div>
      </label>
      {isOpen && (
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
              {sortedNotifications.length === 0 ? (
                <p className="text-center py-2">알림이 없습니다.</p>
              ) : (
                <ul>
                  {sortedNotifications.map((notification) => (
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
      )}
    </div>
  );
};

export default NotificationDropdown;