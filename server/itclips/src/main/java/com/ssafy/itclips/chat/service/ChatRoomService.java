package com.ssafy.itclips.chat.service;

import com.ssafy.itclips.chat.dto.ChatRoomInfoDTO;
import com.ssafy.itclips.chat.dto.GroupRoomDTO;
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
import com.ssafy.itclips.user.dto.UserInfoDTO;
import com.ssafy.itclips.user.dto.UserTitleDTO;
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

import java.util.*;
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
    public Map<String, Long> createChatRoom(Long user1Id, Long user2Id) throws RuntimeException{
        User user1 = userRepository.findById(user1Id).orElseThrow(()-> new CustomException(ErrorCode.USER_NOT_FOUND));
        User user2 = userRepository.findById(user2Id).orElseThrow(()-> new CustomException(ErrorCode.USER_NOT_FOUND));

        ChatRoom chatRoom = ChatRoom.builder()
                .name(user1.getNickname()+","+user2.getNickname())
                .build();

        ChatRoom savedChatRoom = chatRoomJPARepository.save(chatRoom);

        //chat 생성
        saveChat(savedChatRoom, user1);
        saveChat(savedChatRoom, user2);

        //레디스 저장
        saveChatRoomInRedis(savedChatRoom);

        //topic생성
        chatRoomRepository.enterChatRoom(savedChatRoom.getId());
        Map<String, Long> result = new HashMap<>();
        result.put("roomId", savedChatRoom.getId());
        return result;
    }

    //그룹 채팅방 생성
    @Transactional
    public Map<String,Long> chatGroupRoom(GroupRoomDTO groupRoomDTO)throws RuntimeException{
        //채팅방 생성
        ChatRoom chatRoom = ChatRoom.builder()
                .name(groupRoomDTO.getName())
                .build();

        ChatRoom savedChatRoom = chatRoomJPARepository.save(chatRoom);
        for(Long userId : groupRoomDTO.getUserIds()){
            User user = userRepository.findById(userId).orElseThrow(()-> new CustomException(ErrorCode.USER_NOT_FOUND));
            saveChat(savedChatRoom, user);
        }

        //레디스 저장
        saveChatRoomInRedis(savedChatRoom);

        //topic생성
        chatRoomRepository.enterChatRoom(savedChatRoom.getId());
        Map<String, Long> result = new HashMap<>();
        result.put("roomId", savedChatRoom.getId());
        return result;
    }

    //채팅방 정보
    public ChatRoomInfoDTO getRoomInfo(Long roomId) throws RuntimeException{
        List<Chat> chats = chatJPARepository.findByRoomId(roomId)
                .orElseThrow(()-> new CustomException(ErrorCode.CHAT_NOT_FOUND));
        if(chats.isEmpty()){
            throw new CustomException(ErrorCode.CHAT_NOT_FOUND);
        }

        List<UserTitleDTO> userTitleDTOS = new ArrayList<>();
        for(Chat chat : chats){
            log.info(chat.getUser().getId().toString());
            UserTitleDTO userInfoDTO = UserTitleDTO.toDTO(chat.getUser());
            userTitleDTOS.add(userInfoDTO);
        }

        return ChatRoomInfoDTO.toDTO(chats.get(0),userTitleDTOS);
    }

    // 채팅방 레디스 생성
    @Transactional
    public void saveChatRoomInRedis(ChatRoom savedChatRoom) throws RuntimeException{
        ChatRoomDTO chatRoomDTO = ChatRoomDTO.builder()
                .name(savedChatRoom.getName())
                .roomId(savedChatRoom.getId())
                .build();
        // 채팅방 레디스 생성
        chatRoomRepository.createChatRoom(chatRoomDTO);
    }

    @Transactional
    public void saveChat(ChatRoom savedChatRoom, User user1) throws RuntimeException{
        Chat chat1 = Chat.builder()
                .room(savedChatRoom)
                .user(user1)
                .messageCnt(0L)
                .build();
        chatJPARepository.save(chat1);
    }

    //메세지 전송
    @Transactional
    public void publish(MessageDTO message) throws RuntimeException{
        //topic생성
        chatRoomRepository.enterChatRoom(message.getRoomId());
        log.info(message.getSenderId()+" "+message.getRoomId());
        //보낸사람 ,방 찾기
        Chat chat = chatJPARepository.findByUserIdAndRoomId(message.getSenderId(), message.getRoomId())
                .orElseThrow(()-> new CustomException(ErrorCode.CHAT_NOT_FOUND));

        List<Chat> chatList = chatJPARepository.findByRoomId(message.getRoomId())
                .orElseThrow(()-> new CustomException(ErrorCode.CHAT_NOT_FOUND));
        for(Chat chat2 : chatList){
            //안읽은 메세지 +1
            chat2.cnt();
        }//TODO:

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

    //채팅방 메세지 찾기
    @Transactional
    public List<MessageDTO> getMessages(Long roomId)throws RuntimeException{

        List<MessageDTO> messageList = new ArrayList<>();

        // 레디스에서 메세지 가져오기
        messageList = redisTemplateMessage.opsForList().range(roomId.toString(), 0, 99);

        // 레디스에 없으면 db에서 읽어오기
        if(messageList == null|| messageList.isEmpty()) {
            // 최신순 100개
            Pageable pageable = PageRequest.of(0, 100, Sort.by(Sort.Direction.DESC, "createdAt"));
            List<Message> DBMessageList = messageJPARepository.findMessagesByRoomId(roomId);

            for(Message message : DBMessageList) {
                Chat chat = chatJPARepository.findById(message.getChat().getId())
                        .orElseThrow(()->new CustomException(ErrorCode.CHAT_NOT_FOUND));
                MessageDTO messageDTO = MessageDTO.toDTO(message,chat);
                messageList.add(messageDTO);
                //레디스에 저장
                redisTemplateMessage.setValueSerializer(new Jackson2JsonRedisSerializer<>(MessageDTO.class));      // 직렬화
                redisTemplateMessage.opsForList().rightPush(roomId.toString(), messageDTO);
            }
        }
        return messageList;
    }

    //유저가 속한 채팅방 리스트
    @Transactional
    public List<ChatRoomDTO> getChatRooms(Long userId) throws RuntimeException{

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

            //마지막 메세지
            Optional<Message> lastMessage = messageJPARepository.findLastMessageByChatRoomId(chatRoomDTO.getId());
            if(lastMessage.isPresent()) {
                //마지막 메세지
                chatRoomDTO.setLastMessage(lastMessage.get().getMessage());
                //마지막으로 온 시간
                chatRoomDTO.setLastModified(lastMessage.get().getCreatedAt());
            }

            //안읽은 메세지수
            chatRoomDTO.setMessageCnt(chat.getMessageCnt());
            chatRoomDTOList.add(chatRoomDTO);

        }

        return chatRoomDTOList;
    }

    @Transactional
    public void deleteRoom(Long roomId, Long userId)throws RuntimeException{
        chatJPARepository.deleteByRoomIdAndUserId(roomId,userId);
    }

    @Transactional
    public void inviteUser(Long roomId, Long userId)throws RuntimeException{
        if(!chatJPARepository.existsByUserIdAndRoomId(userId, roomId)){
            User user = userRepository.findById(userId)
                    .orElseThrow(()->new CustomException(ErrorCode.USER_NOT_FOUND));
            ChatRoom room = chatRoomJPARepository.findById(roomId)
                    .orElseThrow(()->new CustomException(ErrorCode.CHAT_ROOM_NOT_FOUND));

            //chat저장
            saveChat(room, user);
        }
    }

    //안읽은 메세지 0으로 세팅
    @Transactional
    public void setZero(Long roomId, Long userId)throws RuntimeException{
        Chat chat = chatJPARepository.findByUserIdAndRoomId(userId,roomId)
                .orElseThrow(()->new CustomException(ErrorCode.CHAT_NOT_FOUND));

        chat.setZero();

    }

}
