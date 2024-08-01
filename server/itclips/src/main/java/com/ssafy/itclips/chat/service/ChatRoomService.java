package com.ssafy.itclips.chat.service;

import com.ssafy.itclips.chat.dto.ChatMessage;
import com.ssafy.itclips.chat.dto.ChatRoomDTO;
import com.ssafy.itclips.chat.entity.Chat;
import com.ssafy.itclips.chat.entity.ChatRoom;
import com.ssafy.itclips.chat.entity.Message;
import com.ssafy.itclips.chat.repository.ChatJPARepository;
import com.ssafy.itclips.chat.repository.ChatRoomJPARepository;
import com.ssafy.itclips.chat.repository.ChatRoomRepository;
import com.ssafy.itclips.chat.repository.MessageJPARepository;
import com.ssafy.itclips.error.CustomException;
import com.ssafy.itclips.error.ErrorCode;
import com.ssafy.itclips.user.entity.User;
import com.ssafy.itclips.user.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class ChatRoomService {
    private final ChatRoomRepository chatRoomRepository;
    private final ChatRoomJPARepository chatRoomJPARepository;
    private final ChatJPARepository chatJPARepository;
    private final MessageJPARepository messageJPARepository;
    private final UserRepository userRepository;
    private final RedisPublisher redisPublisher;

    @Transactional
    public void createChatRoom(Long user1Id, Long user2Id) {
        User user1 = userRepository.findById(user1Id).orElseThrow(()-> new CustomException(ErrorCode.USER_NOT_FOUND));
        User user2 = userRepository.findById(user2Id).orElseThrow(()-> new CustomException(ErrorCode.USER_NOT_FOUND));

        ChatRoom chatRoom = ChatRoom.builder()
                .name(user1.getNickname()+","+user2.getNickname())
                .build();

        ChatRoom savedChatRoom = chatRoomJPARepository.save(chatRoom);

        //chat 생성
        saveChat(savedChatRoom, user1);
        saveChat(savedChatRoom, user2);

        ChatRoomDTO chatRoomDTO = ChatRoomDTO.builder()
                .name(savedChatRoom.getName())
                .roomId(savedChatRoom.getId())
                .build();
        // 채팅방 레디스 생성
        chatRoomRepository.createChatRoom(chatRoomDTO);

        //topic생성
        chatRoomRepository.enterChatRoom(savedChatRoom.getId());
    }

    @Transactional
    public void saveChat(ChatRoom savedChatRoom, User user1) {
        Chat chat1 = Chat.builder()
                .room(savedChatRoom)
                .user(user1)
                .build();
        chatJPARepository.save(chat1);
    }

    //메세지 전송
    @Transactional
    public void publish(ChatMessage message) {

        //채팅에 속한 유저 찾기
        List<Chat> chatList = chatJPARepository.findByRoomId(message.getRoomId())
                .orElseThrow(()-> new CustomException(ErrorCode.USER_NOT_FOUND));

        // mysql 메세지 저장
        for(Chat chat : chatList) {
            Message saveMessage = message.toEntity(chat);
            messageJPARepository.save(saveMessage);
        }

        // 레디스 메세지 보내깅
        redisPublisher.publish(chatRoomRepository.getTopic(message.getRoomId()), message);
    }
}
