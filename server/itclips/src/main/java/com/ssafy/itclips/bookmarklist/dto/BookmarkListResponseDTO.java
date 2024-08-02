package com.ssafy.itclips.bookmarklist.dto;

import com.ssafy.itclips.tag.dto.TagDTO;
import com.ssafy.itclips.user.dto.UserTitleDTO;
import lombok.*;

import java.util.List;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class BookmarkListResponseDTO {
    private Long id;
    private String title;
    private String description;
    private Integer bookmarkCount;
    private Integer likeCount;
    private String image;
    private Boolean isLiked;
    Set<TagDTO> tags;
    List<UserTitleDTO> users;

    @Builder
    public BookmarkListResponseDTO(Long id, String title, String description, Integer bookmarkCount,
                                   Integer likeCount, String image, Boolean isLiked, Set<TagDTO> tags, List<UserTitleDTO> users) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.bookmarkCount = bookmarkCount;
        this.likeCount = likeCount;
        this.image = image;
        this.isLiked = isLiked;
        this.tags = tags;
        this.users = users;
    }

}
