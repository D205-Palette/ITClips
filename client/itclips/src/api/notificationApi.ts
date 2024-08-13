import { authenticatedRequest } from "./apiUtils";
import { API_BASE_URL } from "../config";

// 개인 알림 리스트 조회
export const getNotificationList = (userId: number) => {
  return authenticatedRequest("get", `/notify/list/${userId}`, undefined, { userId });
};

// 알림 sse 연결
export const connectNotificationStream = (userId: number): EventSource => {
  const url = `${API_BASE_URL}/notify/connect/${userId}`;
  return new EventSource(url, { withCredentials: true });
};

// 알림 삭제
export const deleteNotification = (alarmId: number) => {
  return authenticatedRequest("delete", `/notify/${alarmId}`, undefined, { alarmId });
};

// 전체 알림 삭제
export const deleteAllNotification = (userId: number) => {
  return authenticatedRequest("delete", `/notify/${userId}`, undefined, { userId });
};

// 알림 읽음 처리
export const updateNotificationStatusToRead = (userId: number) => {
  return authenticatedRequest("put", `/notify/read/${userId}`, undefined, { userId });
};