package com.ssafy.itclips.roadmap.entity;

import com.ssafy.itclips.global.rank.RankDTO;
import com.ssafy.itclips.roadmap.dto.RoadmapRequestDTO;
import jakarta.persistence.*;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.*;
import com.ssafy.itclips.user.entity.User;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "roadmap", schema = "itclips")
@NoArgsConstructor
public class Roadmap {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name="origin")
    private Long origin;

    @Size(max = 255)
    @NotNull
    @Column(name = "title", nullable = false)
    private String title;

    @Size(max = 511)
    @Column(name = "description")
    private String description;

    @CreationTimestamp
    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Size(max = 511)
    @Column(name = "image")
    private String image;

    @NotNull
    @ColumnDefault("0")
    @Column(name = "is_public", nullable = false)
    private Byte isPublic;

    @Column(name = "hit")
    private Long hit;


    //step
    @OneToMany(mappedBy = "roadmap")
    private List<RoadmapStep> stepList = new ArrayList<RoadmapStep>();

    //roadmapComment
    @OneToMany(mappedBy = "roadmap")
    private List<RoadmapComment> roadmapCommentList = new ArrayList<RoadmapComment>();

    //roadmapLike
    @OneToMany(mappedBy = "roadmap")
    private List<RoadmapLike> roadmapLikeList = new ArrayList<RoadmapLike>();

    @Builder
    public Roadmap(Long id, User user, Long origin , String title, String description,String image, Byte isPublic,Long hit) {
        this.id = id;
        this.user = user;
        this.origin = origin;
        this.title = title;
        this.description = description;
        this.isPublic = isPublic;
        this.image = image;
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
        this.hit = hit;
    }

    public void updateRoadmap(RoadmapRequestDTO roadmapRequestDTO) {
        this.title = roadmapRequestDTO.getTitle();
        this.description = roadmapRequestDTO.getDescription();
        this.isPublic = roadmapRequestDTO.getIsPublic();
    }

    public void updateRoadmapImage(String image) {
        this.image = image;
    }

    public RankDTO toRankDTO(Roadmap roadmap){
        return RankDTO.builder()
                .id(roadmap.getId())
                .title(roadmap.getTitle())
                .count(roadmap.getHit())
                .build();
    }

}
