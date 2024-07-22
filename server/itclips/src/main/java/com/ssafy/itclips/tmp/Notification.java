package com.ssafy.itclips.tmp;

import com.ssafy.itclips.tmp.user.User;
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
@Table(name = "notification", schema = "itclips")
public class Notification {
    @Id
    @Column(name = "id", nullable = false)
    private Long id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @NotNull
    @Lob
    @Column(name = "type", nullable = false)
    private String type;

    @NotNull
    @Column(name = "type_id", nullable = false)
    private Long typeId;

    @NotNull
    @Lob
    @Column(name = "contents", nullable = false)
    private String contents;

    @NotNull
    @ColumnDefault("0")
    @Column(name = "`read`", nullable = false)
    private Boolean read = false;

    @ColumnDefault("CURRENT_TIMESTAMP")
    @Column(name = "created_at")
    private Instant createdAt;

}