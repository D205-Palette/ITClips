package com.ssafy.itclips.roadmap.entity;

import com.ssafy.itclips.user.entity.User;
import jakarta.persistence.*;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "roadmap_comment", schema = "itclips")
@NoArgsConstructor
public class RoadmapComment {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "roadmap_id", nullable = false)
    private Roadmap roadmap;

    @NotNull
    @Lob
    @Column(name = "contents", nullable = false)
    private String contents;

    @CreationTimestamp
    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Builder
    public RoadmapComment(Long id, User user, Roadmap roadmap, String contents) {
        this.id = id;
        this.user = user;
        this.roadmap = roadmap;
        this.contents = contents;
    }

    public void updateComment(String contents) {
        this.contents = contents;
    }

}
