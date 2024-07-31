package com.ssafy.itclips.chat.repository;

import com.ssafy.itclips.chat.entity.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatRoomJPARepository extends JpaRepository<ChatRoom, Long> {
}
