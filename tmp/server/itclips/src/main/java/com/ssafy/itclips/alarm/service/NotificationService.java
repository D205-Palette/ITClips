package com.ssafy.itclips.alarm.service;

import com.ssafy.itclips.alarm.entity.Notification;
import com.ssafy.itclips.alarm.entity.NotificationType;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.List;

public interface NotificationService {

    //구독
    SseEmitter subscribe(Long memberId, String lastEventId) throws IOException;

//    //알림 리스트
    List<Notification> findUserList(Long userId);

    // 알림 읽음 처리
    void readAll(Long userId);

    //알림 삭제
    void deleteNotify(Long alarmId);

    // 알림
    //보내는 사람 id, 받는 사람 id , 타입, 보내는 사람 닉네임
    void sendNotification(Long senderId, Long receiverId, Long roadmapId, String nickName, NotificationType type);

    //e댓글, 좋아요 , 스크랩 취소시 알림 삭제
    void deleteNotification(Long senderId, Long receiverId, Long roadmapId, NotificationType type);


    // 알림 모두 삭제
    void deleteAllNotify(Long userId);
}
