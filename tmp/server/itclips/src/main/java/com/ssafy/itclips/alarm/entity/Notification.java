package com.ssafy.itclips.alarm.entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "notification", schema = "itclips")
public class Notification {

    @Id // 알림 id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    //받는 사람 id
    @Column(name = "user_id", nullable = false)
    private Long userId;

    //보낸 사람 id
    @Column(name = "sender_id", nullable = false)
    private Long senderId;

    //알림 종류
    @Enumerated(EnumType.STRING)
    @Column(name = "type", nullable = false)
    private NotificationType type;

    // 알림  출처 ? id
    @Column(name = "type_id", nullable = false)
    private Long typeId;

    // 내용
    @Column(name = "contents", nullable = false, columnDefinition = "TEXT")
    private String contents;

    //읽음 여부
    @Column(name = "`read`", nullable = false, columnDefinition = "TINYINT(1) DEFAULT 0")
    private boolean read;

    //날짜
    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false, insertable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime createdAt;

    @Builder
    public Notification(Long userId, Long senderId, NotificationType type, String contents, boolean read, LocalDateTime createdAt, Long typeId) {
        this.userId = userId;
        this.senderId = senderId;
        this.type = type;
        this.contents = contents;
        this.read = read;
        this.createdAt = createdAt;
        this.typeId = typeId;
    }


}
