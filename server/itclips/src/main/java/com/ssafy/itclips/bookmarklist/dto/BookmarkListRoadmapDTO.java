package com.ssafy.itclips.bookmarklist.dto;

import com.ssafy.itclips.bookmarklist.entity.BookmarkList;
import com.ssafy.itclips.tag.dto.TagDTO;
import com.ssafy.itclips.user.dto.UserTitleDTO;
import lombok.*;

import java.util.Set;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class BookmarkListRoadmapDTO {
    private Long id;
    private String title;
    private String description;
    private Integer bookmarkCount;
    private Integer likeCount;
    private String image;
    private Boolean isPublic;
    Set<TagDTO> tags;
    List<UserTitleDTO> users;

    @Builder
    public BookmarkListRoadmapDTO(Long id, String title, String description,
                                   Integer bookmarkCount, Integer likeCount, String image, Boolean isPublic, Set<TagDTO> tags,List<UserTitleDTO> users) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.bookmarkCount = bookmarkCount;
        this.likeCount = likeCount;
        this.image = image;
        this.tags = tags;
        this.users = users;
        this.isPublic = isPublic;
    }



}
