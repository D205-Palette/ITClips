package com.ssafy.itclips.alarm.repository;

import com.ssafy.itclips.alarm.entity.Notification;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification,Long> {
    void deleteBySenderIdAndUserIdAndTypeId( Long senderId,Long userId, Long typeId);
    List<Notification> findByUserId(Long userId);
}
