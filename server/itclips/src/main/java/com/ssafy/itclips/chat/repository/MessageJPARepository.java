package com.ssafy.itclips.chat.repository;

import com.ssafy.itclips.chat.entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;
import java.util.List;

@Repository
public interface MessageJPARepository extends JpaRepository<Message,Long> {

    @Query("SELECT m FROM Message m WHERE m.chat.room.id = :roomId ORDER BY m.createdAt DESC")
    List<Message> findMessagesByRoomId(@Param("roomId") Long roomId);

    @Query("SELECT m FROM Message m WHERE m.chat.room.id = :roomId ORDER BY m.createdAt DESC LIMIT 1")
    Optional<Message> findLastMessageByChatRoomId(@Param("roomId") Long roomId);
}
