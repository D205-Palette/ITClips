package com.ssafy.itclips.chat.repository;

import com.ssafy.itclips.chat.entity.ChatRoom;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.List;

@Repository
public interface ChatRoomJPARepository extends JpaRepository<ChatRoom, Long> {
}
