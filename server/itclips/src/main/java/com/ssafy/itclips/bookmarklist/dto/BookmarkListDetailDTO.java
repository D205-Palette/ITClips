package com.ssafy.itclips.bookmarklist.dto;

import com.ssafy.itclips.tag.dto.TagDTO;
import com.ssafy.itclips.user.dto.UserTitleDTO;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;
import java.util.Set;

@Getter
@Setter
@ToString
public class BookmarkListDetailDTO {
    private Long id;
    private String title;
    private String description;
    private Integer likeCount;
    private Integer scrapCount;
    private String image;
    private Boolean isLiked;
    private Boolean isScraped;
    Set<TagDTO> tags;
    List<UserTitleDTO> users;

    @Builder
    public BookmarkListDetailDTO(Long id, String title, String description, Integer likeCount,
                                 Integer scrapCount, String image, Boolean isLiked, Boolean isScraped,
                                 Set<TagDTO> tags, List<UserTitleDTO> users) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.likeCount = likeCount;
        this.scrapCount = scrapCount;
        this.image = image;
        this.isLiked = isLiked;
        this.isScraped = isScraped;
        this.tags = tags;
        this.users = users;
    }


}
