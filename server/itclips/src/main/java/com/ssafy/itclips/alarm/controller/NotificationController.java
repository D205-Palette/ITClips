package com.ssafy.itclips.alarm.controller;

import com.ssafy.itclips.alarm.dto.NotifyReadDTO;
import com.ssafy.itclips.alarm.entity.Notification;
import com.ssafy.itclips.alarm.service.NotificationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;


import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/notify")
@RequiredArgsConstructor
@CrossOrigin("*")
@Slf4j
@Tag(name = "notification Controller", description = "알림 관련 API")
public class NotificationController {

    private final NotificationService notificationService;

    // Last-Event-ID는 SSE 연결이 끊어졌을 경우, 클라이언트가 수신한 마지막 데이터의 ID 값을 의미합니다.
    @GetMapping(value = "/connect/{userId}", produces = "text/event-stream")
    @Operation(summary = "sse연결", description = "알림 수신을 위한 sse연결")
    public SseEmitter subscribe(@PathVariable("userId") Long userId,
                                @RequestHeader(value = "Last-Event-ID", required = false, defaultValue = "") String lastEventId) {
        SseEmitter sseEmitter = new SseEmitter();

        try {
            // NotificationService에서 SseEmitter를 구독하고, 알림을 전송하도록 설정
            sseEmitter = notificationService.subscribe(userId, lastEventId);
            log.info("SseEmitter 구독 성공: " + sseEmitter.toString());

        } catch (IOException e) {
            log.error("SSE 연결 중 오류 발생", e);
            // 오류 발생 시 SseEmitter에 오류 전송
            sseEmitter.completeWithError(e);
        }

        return sseEmitter;
    }

    @GetMapping("/list/{userId}")
    @Operation(summary = "유저 알림 리스트 조회 ", description = "유저가 받은 알림 리스트 ")
    public List<Notification> list(@PathVariable("userId") Long userId) {
        List<Notification> notificationList = notificationService.findUserList(userId);
        return notificationList;
    }

    //알림 읽음
    @PutMapping("/read/{userId}")
    @Operation(summary = "알림 읽음 처리", description = "알림 읽음 처리 ")
    public ResponseEntity<?> read(@PathVariable("userId")Long userId) {
        notificationService.readAll(userId);
        return new ResponseEntity<>(HttpStatus.OK);
    }


    //알림 삭제
    @DeleteMapping("/{alarmId}")
    @Operation(summary = "알림 삭제 ", description = "알림 삭제 ")
    public ResponseEntity<?> delete(@PathVariable("alarmId") Long alarmId) {
        notificationService.deleteNotify(alarmId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    //알림 모두 삭제
    @DeleteMapping("deleteAll/{userId}")
    @Operation(summary = "알림 모두 삭제 ", description = "알림 모두 삭제 ")
    public ResponseEntity<?> deleteAll(@PathVariable("userId") Long userId) {
        notificationService.deleteAllNotify(userId);
        return new ResponseEntity<>(HttpStatus.OK);
    }


}
