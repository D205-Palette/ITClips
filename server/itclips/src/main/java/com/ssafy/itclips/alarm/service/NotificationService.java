package com.ssafy.itclips.alarm.service;

import com.ssafy.itclips.alarm.entity.Notification;
import com.ssafy.itclips.alarm.entity.NotificationType;
import org.apache.coyote.BadRequestException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.List;

public interface NotificationService {

    //구독
    SseEmitter subscribe(Long memberId, String lastEventId) throws IOException;

//    //알림 리스트
//    List<SseEmitter> findUserList(Long userId);
    List<Notification> findUserList(Long userId);


    // 좋아요 알림
    //보내는 사람 id, 받는 사람 id , 타입, 보내는 사람 닉네임
    void sendRoadmapLikeNotification(Long senderId, Long receiverId, Long roadmapId, String nickName);

    //좋아요 취소
    void deleteRaodmapLikeNotification(Long senderId, Long receiverId, Long roadmapId);

}
