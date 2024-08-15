package com.ssafy.itclips.roadmap.entity;


import com.ssafy.itclips.bookmarklist.entity.BookmarkList;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Getter
@Setter
@Entity
@Table(name = "roadmap_step", schema = "itclips")
@NoArgsConstructor
@DynamicInsert
public class RoadmapStep {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "roadmap_id", nullable = false)
    private Roadmap roadmap;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "bookmark_list_id", nullable = false)
    private BookmarkList bookmarkList;

    @NotNull
    @Column(name = "`check`", nullable = false)
    private Boolean check;

    @NotNull
    @Column(name = "`order`", nullable = false)
    private Integer order;

    @Builder
    public RoadmapStep(Long id, Roadmap roadmap, BookmarkList bookmarkList, Boolean check, Integer order){
        this.id = id;
        this.roadmap = roadmap;
        this.bookmarkList = bookmarkList;
        this.check = check;
        this.order = order;
    }
}
