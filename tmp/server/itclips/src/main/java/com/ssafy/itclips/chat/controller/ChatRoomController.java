package com.ssafy.itclips.chat.controller;

import com.ssafy.itclips.chat.dto.ChatRoomInfoDTO;
import com.ssafy.itclips.chat.dto.GroupRoomDTO;
import com.ssafy.itclips.chat.dto.MessageDTO;
import com.ssafy.itclips.chat.dto.ChatRoomDTO;
import com.ssafy.itclips.chat.repository.ChatRoomRepository;
import com.ssafy.itclips.chat.service.ChatRoomService;
import com.ssafy.itclips.user.dto.UserTitleDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/chat")
@Tag(name = "Chat Controller", description = "채팅 관련 API")
public class ChatRoomController {

    private final ChatRoomService chatRoomService;

    //채팅 방 만들기
    @Operation(summary = "1:1 채팅방 만들기 ", description = "채팅방을 만듭니다")
    @PostMapping("/room/{user1Id}/{user2Id}")
    public ResponseEntity<?> createRoom(@PathVariable("user1Id")Long user1Id, @PathVariable("user2Id")Long user2Id) {
        Map<String,Long> roomId = chatRoomService.createChatRoom(user1Id, user2Id);
        return new ResponseEntity<>(roomId,HttpStatus.OK);
    }
    // 그룹 채팅 방 만들기
    @Operation(summary = "그룹 채팅방 만들기" , description = "그룹 채팅방을 만듭니다.")
    @PostMapping("/room")
    public ResponseEntity<?> createGroupRoom(@RequestBody GroupRoomDTO groupRoomDTO) {
        Map<String,Long> roomId = chatRoomService.chatGroupRoom(groupRoomDTO);
        return new ResponseEntity<>(roomId, HttpStatus.OK);
    }

    // 채팅방 정보
    @Operation(summary = "채팅방 정보 ", description = "채팅방 제목, 채팅방에 속한 사람을 알 수 있습니다.")
    @GetMapping("/room/info/{roomId}")
    public ResponseEntity<?> getRoomInfo(@PathVariable("roomId") Long roomId) {
        ChatRoomInfoDTO info = chatRoomService.getRoomInfo(roomId);
        return new ResponseEntity<>(info,HttpStatus.OK);

    }
    // 내가 속한 채팅방 리스트
    @GetMapping("/rooms/{userId}")
    @Operation(summary = "특정 유저가 속한 채팅방 목록" ,description = "해당 유저가 속한 모든 채팅방 목록")
    public ResponseEntity<?> getRooms(@PathVariable("userId")Long userId) {
        List<ChatRoomDTO> chatRooms = chatRoomService.getChatRooms(userId);
        return new ResponseEntity<>(chatRooms, HttpStatus.OK);
    }

    //채팅방 메세지 목록
    @GetMapping("messages/{roomId}")
    @Operation(summary = "채팅방 메세지 목록", description = "채팅방에 존재하는 모든 메세지 목록입니다.")
    public ResponseEntity<?> getMessages(@PathVariable("roomId")Long roomId) {
        List<MessageDTO> messageDTOS = chatRoomService.getMessages(roomId);

        return new ResponseEntity<>(messageDTOS, HttpStatus.OK);
    }

    //채팅방 나가기
    @DeleteMapping("/room/{roomId}/{userId}")
    @Operation(summary = "채팅방 나가기", description = "채팅방 나가기")
    public ResponseEntity<?> deleteRoom(@PathVariable("roomId")Long roomId,@PathVariable("userId")Long userId) {
        chatRoomService.deleteRoom(roomId,userId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    //채팅방 초대
    @PostMapping("/invite/{roomId}/{userId}")
    @Operation(summary = "채팅방 초대", description = "채팅방 초대")
    public ResponseEntity<?> inviteUser(@PathVariable("roomId")Long roomId,@PathVariable("userId")Long userId) {
        chatRoomService.inviteUser(roomId,userId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    // 읽음 처리
    @GetMapping("/messages/readAll/{roomId}/{userId}")
    @Operation(summary = "해당 방 안 읽은 메세지 모두 읽음처리", description = "안읽은 메세지 모두 읽음으로 처리")
    public ResponseEntity<?> readAll(@PathVariable("roomId")Long roomId,@PathVariable("userId")Long userId) {
        chatRoomService.setZero(roomId, userId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}