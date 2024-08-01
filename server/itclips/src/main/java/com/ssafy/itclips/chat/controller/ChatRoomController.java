package com.ssafy.itclips.chat.controller;

import com.ssafy.itclips.chat.dto.MessageDTO;
import com.ssafy.itclips.chat.dto.ChatRoomDTO;
import com.ssafy.itclips.chat.repository.ChatRoomRepository;
import com.ssafy.itclips.chat.service.ChatRoomService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/chat")
@Tag(name = "Chat Controller", description = "채팅 관련 API")
public class ChatRoomController {

    private final ChatRoomRepository chatRoomRepository;
    private final ChatRoomService chatRoomService;

    //채팅 방 만들기
    @Operation(summary = "1:1 채팅방 만들기 ", description = "채팅방을 만듭니다")
    @PostMapping("/room/{user1Id}/{user2Id}")
    public ResponseEntity<?> createRoom(@PathVariable("user1Id")Long user1Id, @PathVariable("user2Id")Long user2Id) {
        chatRoomService.createChatRoom(user1Id, user2Id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    // 내가 속한 채팅방 리스트
    @GetMapping("/rooms/{userId}")
    @Operation(summary = "특정 유저가 속한 채팅방 목록" ,description = "해당 유저가 속한 모든 채팅방 목록")
    public ResponseEntity<?> getRooms(@PathVariable("userId")Long userId) {
        List<ChatRoomDTO> chatRooms = chatRoomService.getChatRooms(userId);
        return new ResponseEntity<>(chatRooms, HttpStatus.OK);
    }

    @GetMapping("messages/{roomId}")
    @Operation(summary = "채팅방 메세지 목록", description = "채팅방에 존재하는 모든 메세지 목록입니다.")
    public ResponseEntity<?> getMessages(@PathVariable("roomId")Long roomId) {
        List<MessageDTO> messageDTOS = chatRoomService.getMessages(roomId);

        return new ResponseEntity<>(messageDTOS, HttpStatus.OK);
    }

    //-------------------------------------------------


//    @GetMapping("/rooms")
//    public List<ChatRoomDTO> room() {
//        return chatRoomRepository.findAllRoom();
//    }
//
//
//    @GetMapping("/room/enter/{roomId}")
//    public String roomDetail(Model model, @PathVariable String roomId) {
//        model.addAttribute("roomId", roomId);
//        return "/chat/roomdetail";
//    }
//
//    @GetMapping("/room/{roomId}")
//    public ChatRoomDTO roomInfo(@PathVariable Long roomId) {
//        return chatRoomRepository.findRoomById(roomId);
//    }
}