package com.ssafy.itclips.tag.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

@Getter
@Entity
@Table(name = "tag", schema = "itclips")
@NoArgsConstructor
public class Tag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "title", nullable = false, length = 20)
    private String title;

    @ColumnDefault("0")
    @Column(name = "is_origin")
    private Boolean isOrigin;


    @Builder
    public Tag(String title, Boolean isOrigin) {
        this.title = title;
        this.isOrigin = isOrigin;
    }

}