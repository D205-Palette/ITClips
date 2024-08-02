package com.ssafy.itclips.chat.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.sql.Timestamp;
import java.time.Instant;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "message", schema = "itclips")
@NoArgsConstructor
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;

    @NotNull
    @Lob
    @Column(name = "message", nullable = false)
    private String message;

    @NotNull
    @ColumnDefault("0")
    @Column(name = "`read`", nullable = false)
    private Boolean read = false;

    @NotNull
    @CreationTimestamp
    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "chat_id", nullable = false)
    private Chat chat;


    @Builder
    public Message(String message, Boolean read, LocalDateTime createdAt, Chat chat) {
        this.message = message;
        this.read = read;
        this.createdAt = createdAt;
        this.chat = chat;
        this.createdAt = LocalDateTime.now();
    }
}
