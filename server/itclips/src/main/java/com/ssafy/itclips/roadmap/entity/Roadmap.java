package com.ssafy.itclips.roadmap.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import com.ssafy.itclips.user.entity.User;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "roadmap", schema = "itclips")
public class Roadmap {

    @Id
    @GeneratedValue
    @Column(name = "id", nullable = false)
    private Long id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Size(max = 255)
    @NotNull
    @Column(name = "title", nullable = false)
    private String title;

    @Lob
    @Column(name = "description")
    private String description;

    @NotNull
    @ColumnDefault("CURRENT_TIMESTAMP")
    @Column(name = "created_at", nullable = false)
    private Instant createdAt;

    @ColumnDefault("CURRENT_TIMESTAMP")
    @Column(name = "updated_at")
    private Instant updatedAt;

    @Size(max = 255)
    @Column(name = "image")
    private String image;

    @NotNull
    @ColumnDefault("0")
    @Column(name = "is_public", nullable = false)
    private Byte isPublic;

    //step
    @OneToMany(mappedBy = "roadmap")
    private List<RoadmapStep> stepList = new ArrayList<RoadmapStep>();

    //roadmapComment
    @OneToMany(mappedBy = "roadmap")
    private List<RoadmapComment> roadmapCommentList = new ArrayList<RoadmapComment>();

    //roadmapLike
    @OneToMany(mappedBy = "roadmap")
    private List<RoadmapLike> roadmapLikeList = new ArrayList<RoadmapLike>();


}
