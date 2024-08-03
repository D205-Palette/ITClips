package com.ssafy.itclips.bookmarklist.dto;

import com.ssafy.itclips.tag.dto.TagDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BookmarkListDTO {

    private String title;
    private String description;
    private String image;
    private Boolean isPublic;
    private List<String> categories;
    private List<String> users;
    private List<TagDTO> tags;

    public void setImageToS3FileName(String fileName) {
        this.image=fileName;
    }
}
