import React, { useState, useEffect, useRef, useMemo } from "react";
import { NavLink } from "react-router-dom";
import { format, parseISO, addHours } from "date-fns";

// icons
import { FaBell, FaTimes, FaCheck } from "react-icons/fa";

// stores
import notificationStore from "../../stores/notificationStore";
import { authStore } from "../../stores/authStore";
import darkModeStore from "../../stores/darkModeStore";

interface Notification {
  id: number;
  userId: number;
  senderId: number;
  type: string;
  typeId: number;
  contents: string;
  read: boolean;
  createdAt: string;
}

const NotificationDropdown: React.FC = () => {
  const userId = authStore(state => state.userId);
  const isDark = darkModeStore(state => state.isDark);

  const { notifications, fetchNotifications, markAllAsRead, deleteNotification } = notificationStore();
  const [ isOpen, setIsOpen ] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 알림 버튼 눌러서 열고 닫기 토글
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  // NavLink 클릭 시 드롭다운 닫기
  const handleNavLinkClick = () => {
    setIsOpen(false);
  };

  // 알림창 외에 다른 곳을 클릭하면 알림창이 닫히도록
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

  // 알림 목록 가져오기
  useEffect(() => {
    if (userId) {
      fetchNotifications(userId);
    }
  }, [userId, fetchNotifications]);

  // 모든 알림 읽음 처리
  const handleMarkAllAsRead = () => {
    if (userId) {
      markAllAsRead(userId);
    }
  };

  // 알림 삭제
  const handleDelete = (event: React.MouseEvent, notificationId: number) => {
    event.stopPropagation();
    event.preventDefault();
    deleteNotification(notificationId);
  };

  // 읽지않은 알림 갯수 세서 뱃지 출력하기
  const unreadCount = useMemo(() => {
    return notifications.filter(notification => !notification.read).length;
  }, [notifications]);

  // 알림을 ID 기준으로 내림차순 정렬
  const sortedNotifications = useMemo(() => {
    return [...notifications].sort((a, b) => b.id - a.id);
  }, [notifications]);

  // 알림타입에 따른 주소
  const getNotificationLink = (notification: Notification) => {
    switch (notification.type) {
      case "FOLLOW":
        return `/user/${notification.typeId}`;
      case "LIST_LIKE":
      case "LIST_SCRAP":
      case "LIST_COMMENT":
        return `/bookmarklist/${notification.typeId}`;
      case "ROADMAP_LIKE":
      case "ROADMAP_SCRAP":
      case "ROADMAP_COMMENT":
        return `/roadmap/${notification.typeId}`;
      default:
        return "#";
    }
  };

  // 알림 시간 변환 (서버에서 +18시간 - 받아올때 -18시간해서 가져옴)
  const formatDate = (dateString: string) => {
    const date = parseISO(dateString);
    const adjustedDate = addHours(date, 18);
    return format(adjustedDate, "yyyy-MM-dd HH:mm");
  };

  return (
    <div ref={dropdownRef} className={`dropdown dropdown-end ${isOpen ? 'dropdown-open' : ''} relative`}>
      <label tabIndex={0} onClick={handleToggle}>
        <div className="indicator cursor-pointer">
          <FaBell className="transition-colors duration-300 hover:text-gray-400" />
          {unreadCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 rounded-full h-3 w-3 flex items-center justify-center"></span>
          )}
        </div>
      </label>
      {isOpen && (
        <div tabIndex={0} className="fixed border inset-0 top-[var(--navbar-height)] z-40 bg-base-100 md:absolute md:inset-auto md:right-0 md:top-full md:mt-3 md:w-96 md:rounded-box md:shadow">
          <div className={`p-4 ${isDark ? "bg-base-200" : "bg-sky-200"} md:rounded-t-box border`}>
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-lg">알림</h3>
              {unreadCount > 0 && (
                <button onClick={handleMarkAllAsRead} className="btn btn-xs btn-ghost">
                  <FaCheck className="mr-1" /> 모두 읽음
                </button>
              )}
            </div>
          </div>
          <div className="p-4 h-[calc(100vh-var(--navbar-height))] md:max-h-96 overflow-y-auto scrollbar-hide">
          {sortedNotifications.length === 0 ? (
              <p className="text-center py-2">알림이 없습니다.</p>
            ) : (
              <ul>
                {sortedNotifications.map((notification) => (
                  <li key={notification.id} className={`py-2 border-b ${notification.read ? 'bg-base-200' : 'bg-white'} rounded`}>
                    <div className="flex items-center">
                      <NavLink 
                        to={getNotificationLink(notification)}
                        className="flex-grow hover:bg-gray-50 p-2 rounded transition-colors duration-200"
                        onClick={handleNavLinkClick}
                      >
                        <div className="flex flex-col">
                          <span className={`text-sm ${notification.read ? 'text-base-content' : 'text-black font-semibold'}`}>
                            {notification.contents}
                          </span>
                          <span className="text-xs text-gray-400 mt-1">
                            {formatDate(notification.createdAt)}
                          </span>
                        </div>
                      </NavLink>
                      <button 
                        onClick={(event) => handleDelete(event, notification.id)} 
                        className="btn btn-ghost btn-sm p-1 me-2"
                      >
                        <FaTimes />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;