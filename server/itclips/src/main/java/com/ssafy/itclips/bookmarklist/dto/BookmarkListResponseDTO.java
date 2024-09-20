package com.ssafy.itclips.bookmarklist.dto;

import com.ssafy.itclips.tag.dto.TagDTO;
import com.ssafy.itclips.user.dto.UserTitleDTO;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class BookmarkListResponseDTO {
    private Long id;
    private Long userId;
    private String title;
    private String description;
    private Integer bookmarkCount;
    private LocalDateTime createdAt;
    private Integer likeCount;
    private String image;
    private Boolean isLiked;
    private Boolean isPublic;
    Set<TagDTO> tags;
    List<UserTitleDTO> users;

    @Builder
    public BookmarkListResponseDTO(Long id, Long userId, String title, String description, Integer bookmarkCount,
                                   Integer likeCount, String image, Boolean isLiked, Boolean isPublic, Set<TagDTO> tags, List<UserTitleDTO> users, LocalDateTime createdAt) {
        this.id = id;
        this.userId = userId;
        this.title = title;
        this.description = description;
        this.bookmarkCount = bookmarkCount;
        this.likeCount = likeCount;
        this.image = image;
        this.isLiked = isLiked;
        this.tags = tags;
        this.users = users;
        this.createdAt = createdAt;
        this.isPublic = isPublic;
    }


}
