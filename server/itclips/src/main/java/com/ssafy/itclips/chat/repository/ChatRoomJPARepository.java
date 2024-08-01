package com.ssafy.itclips.chat.repository;

import com.ssafy.itclips.chat.entity.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChatRoomJPARepository extends JpaRepository<ChatRoom, Long> {
}
