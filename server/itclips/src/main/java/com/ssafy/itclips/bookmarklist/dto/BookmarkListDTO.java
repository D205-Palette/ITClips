package com.ssafy.itclips.bookmarklist.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BookmarkListDTO {

    private String title;
    private String description;
    private String image;
    private Boolean isPublic;
}
