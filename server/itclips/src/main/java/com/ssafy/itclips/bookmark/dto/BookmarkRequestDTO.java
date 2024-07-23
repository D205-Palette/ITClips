package com.ssafy.itclips.bookmark.dto;

import com.ssafy.itclips.tag.dto.TagDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BookmarkRequestDTO {
    private String url;
    private String title;
    private ArrayList<TagDTO> tags;
    private String content;
}
