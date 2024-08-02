package com.ssafy.itclips.bookmark.dto;

import com.ssafy.itclips.tag.dto.TagDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BookmarkUpdateDTO {
    private String title;
    private List<TagDTO> tags;
    private String content;
}
