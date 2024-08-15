package com.ssafy.itclips.bookmark.dto;

import com.ssafy.itclips.tag.dto.TagDTO;
import lombok.*;

import java.util.List;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class BookmarkRequestDTO {
    private String url;
    private String title;
    private List<TagDTO> tags;
    private String content;
}
