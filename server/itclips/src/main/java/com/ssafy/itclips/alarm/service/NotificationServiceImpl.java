package com.ssafy.itclips.alarm.service;

import com.ssafy.itclips.alarm.dto.NotifyReadDTO;
import com.ssafy.itclips.alarm.entity.Notification;
import com.ssafy.itclips.alarm.entity.NotificationType;
import com.ssafy.itclips.alarm.repository.EmitterRepository;
import com.ssafy.itclips.alarm.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class NotificationServiceImpl implements NotificationService{

    private final EmitterRepository emitterRepository;
    private final NotificationRepository notificationRepository;

    //연결 지속시간 한시간
    private static final Long DEFAULT_TIMEOUT = 60L * 1000 * 60;

    @Override
    //구독
    public SseEmitter subscribe(Long memberId,String lastEventId) throws IOException {
        // 고유한 아이디 생성
        String emitterId = memberId +"_"+System.currentTimeMillis();
        SseEmitter emitter  = emitterRepository.save(emitterId, new SseEmitter(DEFAULT_TIMEOUT));

        //시간 초과나 비동기 요청이 안되면 자동으로 삭제
        emitter.onCompletion(() -> emitterRepository.deleteById(emitterId));
        emitter.onTimeout(() -> emitterRepository.deleteById(emitterId));

        //최초 연결시 더미데이터가 없으면 503 오류가 발생하기 때문에 해당 더미 데이터 생성
        sendToClient(emitter,emitterId, "EventStream Created. [memberId=" + memberId + "]");
        log.info("Sending data to client: id={}", emitterId);
        //lastEventId 있다는것은 연결이 종료됬다. 그래서 해당 데이터가 남아있는지 살펴보고 있다면 남은 데이터를 전송
        if(!lastEventId.isEmpty()){
            Map<String, Object> events = emitterRepository.findAllEventCacheStartWithByUserId(String.valueOf(memberId));
            events.entrySet().stream()
                    .filter(entry -> lastEventId.compareTo(entry.getKey())<0)
                    .forEach(entry -> {
                        try {
                            sendToClient(emitter,entry.getKey(),entry.getValue());
                        } catch (IOException e) {
                            throw new RuntimeException(e);
                        }
                    });
        }
        return emitter;

    }

    // 유저 알림 리스트
    @Override
    public List<Notification> findUserList(Long userId) {
        List<Notification> notificationList = notificationRepository.findByUserId(userId);
        return notificationList;
    }

    // 읽음 처리
    @Override
    public void readAll(Long userId) {
        //알림 아이디 목록 받아옴
        List<Notification> notificationList = notificationRepository.findByUserId(userId);
        for (Notification notification : notificationList) {
            // 알림읽음 처리
            notification.setRead(true);
            //저장
            notificationRepository.save(notification);
        }
    }

    @Override
    public void deleteNotify(Long alarmId) {
        notificationRepository.deleteById(alarmId);
    }


    // 좋아요 알림
    //보내는 사람 id, 받는 사람 id , 타입, 보내는 사람 닉네임
    @Override
    public void sendRoadmapLikeNotification(Long senderId, Long receiverId, Long roadmapId, String nickName){
        String content = nickName+"님이 회원님의 로드맵을 좋아합니다.";

        send(senderId, receiverId, NotificationType.ROADMAP_LIKE, content, roadmapId);

    }

    //좋아요 취소
    @Override
    public void deleteRaodmapLikeNotification(Long senderId, Long receiverId, Long roadmapId){
        notificationRepository.deleteBySenderIdAndUserIdAndTypeId(senderId,receiverId,roadmapId);
    }


    @Transactional
    //메세지 전송
    public void send(Long senderId, Long receiverId, NotificationType notificationType, String content, Long typeId) {
        Notification notification = Notification.builder()
                .type(notificationType)
                .senderId(senderId)
                .userId(receiverId)
                .typeId(typeId)
                .contents(content)
                .build();

        //db 저장
        Notification savedNotification = notificationRepository.save(notification);
        //받는 사람
        String memberId = String.valueOf(receiverId);

        // memberId 사람 알림저장소??? 찾기
        Map<String, SseEmitter> sseEmitters = emitterRepository.findAllEmitterStartWithByUserId(memberId);
        sseEmitters.forEach(
                (key, emitter) -> {
                    //알림 저장
                    emitterRepository.saveEventCache(key, savedNotification);
                    try {
                        sendToClient(emitter, key,savedNotification);
                    } catch (IOException e) {
                        throw new RuntimeException(e);
                    }
                }
        );
    }

    @Transactional
    public void sendToClient(SseEmitter emitter, String emitterId, Object data) throws IOException {
        emitter.send(SseEmitter.event()
                .id(emitterId)
                .data(data));

    }

}
