import React, { useState, useRef, useEffect } from "react";
import { FaBell } from "react-icons/fa";

interface Notification {
  id: number;
  text: string;
}

const NotificationDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLUListElement>(null);

  const notifications: Notification[] = [
    { id: 1, text: "알림 1" },
    { id: 2, text: "알림 2" },
    { id: 3, text: "알림 3" },
    { id: 4, text: "알림 4" },
    { id: 5, text: "알림 5" },
    { id: 6, text: "알림 6" },
    { id: 7, text: "알림 7" },
    { id: 8, text: "알림 8" },
    { id: 9, text: "알림 9" },
    { id: 10, text: "알림 10" },
  ];

  return (
    <div className="dropdown dropdown-hover">
      <div tabIndex={0} role="button" className="hover:text-sky-700 m-1">
        <FaBell/>
      </div>
      <ul
        tabIndex={0}
        className="flex flex-col dropdown-content menu bg-base-100 rounded-box z-[1] right-0 w-52 p-2 shadow overflow-scroll"
      >
        {notifications.map((notification) => (
        <li key={notification.id}>
          <a>{notification.text}</a>
        </li>
      ))}
      </ul>
    </div>
  );
};

export default NotificationDropdown;


