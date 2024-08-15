package com.ssafy.itclips.bookmarklist.dto;

import com.ssafy.itclips.tag.dto.TagDTO;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class BookmarkListAndTagsDTO {
    private Long id;
    private String title;
    private List<TagDTO> tags;

    @Builder
    public BookmarkListAndTagsDTO(Long id, String title, List<TagDTO> tags) {
        this.id = id;
        this.title = title;
        this.tags = tags;
    }
}
