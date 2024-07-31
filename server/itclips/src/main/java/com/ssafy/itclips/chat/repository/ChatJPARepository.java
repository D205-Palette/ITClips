package com.ssafy.itclips.chat.repository;

import com.ssafy.itclips.chat.entity.Chat;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatJPARepository extends JpaRepository<Chat,Long> {
}
