package com.ssafy.itclips.bookmark.dto;

import com.ssafy.itclips.bookmark.entity.Bookmark;
import com.ssafy.itclips.category.entity.Category;
import com.ssafy.itclips.tag.dto.TagDTO;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@ToString
public class BookmarkDetailDTO {
    private Long id;
    private String category;
    private String title;
    private String url;
    private List<TagDTO> tags;
    private String content;
    private Boolean isLiked;
    private Integer likeCount;

    @Builder
    public BookmarkDetailDTO(Long id, String category, String title, String url, List<TagDTO> tags, String content, Integer likeCount, Boolean isLiked) {
        this.id = id;
        this.category = category;
        this.title = title;
        this.url = url;
        this.tags = tags;
        this.content = content;
        this.likeCount = likeCount;
        this.isLiked = isLiked;
    }

    public static BookmarkDetailDTO toDTO(Bookmark bookmark, Category category) {
        return BookmarkDetailDTO.builder()
                .id(bookmark.getId())
                .category(category.getName())
                .title(bookmark.getTitle())
                .url(bookmark.getUrl())
                .content(bookmark.getDescription())
                .build();
    }

    public void addTagsAndLike(List<TagDTO> tags,Integer likeCount,Boolean isLiked) {
        this.tags = tags;
        this.likeCount = likeCount;
        this.isLiked = isLiked;
    }
}
