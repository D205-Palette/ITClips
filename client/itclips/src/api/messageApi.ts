import { authenticatedRequest } from "./apiUtils";

interface RoomInfo {
  name: string;
  userIds: number[];
}

// 채팅방 목록 조회
export const getChatRooms = (userId: number) => {
  return authenticatedRequest("get", `/chat/rooms/${userId}`, undefined, { userId });
};

// 특정 채팅방 메세지 목록 조회
export const getChatRoomMessages = (roomId: number) => {
  return authenticatedRequest("get", `/chat/messages/${roomId}`, undefined, { roomId });
};

// 1:1 채팅방 만들기
export const createPrivateChatRoom = (user1Id: number, user2Id: number) => {
  return authenticatedRequest("post", `/chat/room/${user1Id}/${user2Id}`, undefined, { user1Id, user2Id });
};

// 채팅방 나가기
export const deleteChatRoom = (roomId: number, userId: number) => {
  return authenticatedRequest("delete", `/chat/room/${roomId}/${userId}`, undefined, { roomId, userId });
};

// 채팅방 초대
export const inviteToChatRoom = (roomId: number, userId: number) => {
  return authenticatedRequest("post", `/chat/invite/${roomId}/${userId}`, undefined, { roomId, userId });
};

// 그룹 채팅방 만들기
export const createGroupChatRoom = (roomInfo: RoomInfo) => {
  return authenticatedRequest("post", `/chat/room`, roomInfo, undefined);
};

// 채팅방 정보 조회
export const getChatRoomInfo = (roomId: number) => {
  return authenticatedRequest("get", `/chat/room/info/${roomId}`, undefined, { roomId });
};