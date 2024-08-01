package com.ssafy.itclips.chat.controller;

import com.ssafy.itclips.chat.dto.ChatRoomDTO;
import com.ssafy.itclips.chat.entity.ChatRoom;
import com.ssafy.itclips.chat.repository.ChatRoomJPARepository;
import com.ssafy.itclips.chat.repository.ChatRoomRepository;
import com.ssafy.itclips.chat.service.ChatRoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/chat")
public class ChatRoomController {

    private final ChatRoomRepository chatRoomRepository;
    private final ChatRoomService chatRoomService;

    //채팅 방 만들기
    @PostMapping("/room/{user1Id}/{user2Id}")
    public ResponseEntity<?> createRoom(@PathVariable("user1Id")Long user1Id, @PathVariable("user2Id")Long user2Id) {
        chatRoomService.createChatRoom(user1Id, user2Id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    // 내가 속한 채팅방 리스트
    @GetMapping("/rooms/{userId}")
    public ResponseEntity<?> getRooms(@PathVariable("userId")Long userId) {
        List<ChatRoomDTO> chatRooms = chatRoomService.getChatRooms(userId);
        return new ResponseEntity<>(chatRooms, HttpStatus.OK);
    }

//-------------------------------------------------------------------------------------------------------
//    @GetMapping("/room")
//    public String rooms(Model model) {
//        return "/chat/room";
//    }

    @GetMapping("/rooms")
    public List<ChatRoomDTO> room() {
        return chatRoomRepository.findAllRoom();
    }

//    @PostMapping("/room/{user1Id}/{user2Id}")
//    public ChatRoom createRoom(@RequestParam String name) {
//        return chatRoomRepository.createChatRoom(name);
//    }

    @GetMapping("/room/enter/{roomId}")
    public String roomDetail(Model model, @PathVariable String roomId) {
        model.addAttribute("roomId", roomId);
        return "/chat/roomdetail";
    }

    @GetMapping("/room/{roomId}")
    public ChatRoomDTO roomInfo(@PathVariable Long roomId) {
        return chatRoomRepository.findRoomById(roomId);
    }
}