package com.ssafy.itclips.chat.service;

import com.ssafy.itclips.chat.dto.MessageDTO;
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
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.data.redis.serializer.Jackson2JsonRedisSerializer;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.TimeUnit;

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
    private final RedisTemplate<String, MessageDTO> redisTemplateMessage;

    //방 생성
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
    public void publish(MessageDTO message) {
        //topic생성
        chatRoomRepository.enterChatRoom(message.getRoomId());
        log.info(message.getSenderId()+" "+message.getRoomId());
        //보낸사람 ,방 찾기
        Chat chat = chatJPARepository.findByUserIdAndRoomId(message.getSenderId(), message.getRoomId())
                .orElseThrow(()-> new CustomException(ErrorCode.CHAT_NOT_FOUND));

        // mysql 메세지 저장
        Message saveMessage = message.toEntity(chat);
        messageJPARepository.save(saveMessage);

        // 레디스 저장
        //직렬화
        redisTemplateMessage.setValueSerializer(new Jackson2JsonRedisSerializer<>(MessageDTO.class));
        redisTemplateMessage.opsForList().rightPush(message.getRoomId().toString(), message);
        // 3. expire 을 이용해서, Key 를 만료시킬 수 있음
        redisTemplateMessage.expire(message.getRoomId().toString(), 1, TimeUnit.MINUTES);

        // 레디스 메세지 보내깅
        redisPublisher.publish(chatRoomRepository.getTopic(message.getRoomId()), message);


    }

    //유저가 속한 채팅방 리스트
    @Transactional
    public List<ChatRoomDTO> getChatRooms(Long userId) {

        // 특정 유저가 속한 채팅 가져오기
        List<Chat> chatRoomList = chatJPARepository.findByUserId(userId)
                .orElseThrow(()->new CustomException(ErrorCode.CHAT_NOT_FOUND));

        List<ChatRoomDTO> chatRoomDTOList = new ArrayList<>();
        for(Chat chat : chatRoomList) {
            // 레디스에서 방 찾기
            ChatRoomDTO chatRoomDTO = chatRoomRepository.findRoomById(chat.getRoom().getId());
            // 레디스에 없으면
            if(chatRoomDTO == null) {
                ChatRoom chatRoom = chatRoomJPARepository.findById(chat.getRoom().getId())
                        .orElseThrow(()->new CustomException(ErrorCode.CHAT_ROOM_NOT_FOUND));
                chatRoomDTO = ChatRoomDTO.toDto(chatRoom);
                //레디스 저장
                chatRoomRepository.createChatRoom(chatRoomDTO);
            }
            chatRoomDTOList.add(chatRoomDTO);
        }

        return chatRoomDTOList;
    }

    @Transactional
    //채팅방 메세지 찾기
    public List<MessageDTO> getMessages(Long roomId){

        List<MessageDTO> messageList = new ArrayList<>();

        // 레디스에서 메세지 가져오기
        List<MessageDTO> redisMessageList = redisTemplateMessage.opsForList().range(roomId.toString(), 0, 99);

        // 레디스에 없으면 db에서 읽어오기
        if(redisMessageList == null|| redisMessageList.isEmpty()) {
            // 최신순 100개
            Pageable pageable = PageRequest.of(0, 100, Sort.by(Sort.Direction.DESC, "createdAt"));
            List<Message> DBMessageList = messageJPARepository.findMessagesByRoomId(roomId);

            for(Message message : DBMessageList) {
                Chat chat = chatJPARepository.findById(message.getChat().getId())
                        .orElseThrow(()->new CustomException(ErrorCode.CHAT_NOT_FOUND));
                MessageDTO messageDTO = MessageDTO.toDTO(message,chat);
                messageList.add(messageDTO);
                //레디스에 저장
                redisTemplateMessage.setValueSerializer(new Jackson2JsonRedisSerializer<>(Message.class));      // 직렬화
                redisTemplateMessage.opsForList().rightPush(roomId.toString(), messageDTO);
            }
        }
        return messageList;
    }

    @Transactional
    public void deleteRoom(Long roomId, Long userId){
        chatJPARepository.deleteByRoomIdAndUserId(roomId,userId);
    }

    @Transactional
    public void inviteUser(Long roomId, Long userId){
        if(!chatJPARepository.existsByUserIdAndRoomId(userId, roomId)){
            User user = userRepository.findById(userId)
                    .orElseThrow(()->new CustomException(ErrorCode.USER_NOT_FOUND));
            ChatRoom room = chatRoomJPARepository.findById(roomId)
                    .orElseThrow(()->new CustomException(ErrorCode.CHAT_ROOM_NOT_FOUND));

            Chat chat = Chat.builder()
                    .user(user)
                    .room(room)
                    .build();
            chatJPARepository.save(chat);
        }
    }
}
