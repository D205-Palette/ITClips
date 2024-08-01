package com.ssafy.itclips.chat.repository;

import com.ssafy.itclips.chat.entity.Chat;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.List;

@Repository
public interface ChatJPARepository extends JpaRepository<Chat,Long> {
    Optional<List<Chat>> findByRoomId(Long roomId);
    Optional<List<Chat>> findByUserId(Long userId);
    Optional<Chat> findByUserIdAndRoomId(Long userId, Long roomId);

}
