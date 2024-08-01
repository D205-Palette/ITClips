package com.ssafy.itclips.chat.repository;

import com.ssafy.itclips.chat.entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MessageJPARepository extends JpaRepository<Message,Long> {

}
