package com.ssafy.itclips.tmp;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.Instant;

@Getter
@Setter
@Entity
@Table(name = "message", schema = "itclips")
public class Message {
    @Id
    @Column(name = "id", nullable = false)
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
    @ColumnDefault("CURRENT_TIMESTAMP")
    @Column(name = "created_at", nullable = false)
    private Instant createdAt;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "chat_id", nullable = false)
    private Chat chat;

}