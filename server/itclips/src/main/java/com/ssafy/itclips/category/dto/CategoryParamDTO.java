package com.ssafy.itclips.category.dto;

import lombok.*;

@Setter
@Getter
@NoArgsConstructor
public class CategoryParamDTO {
    private Long categoryId;
    private String categoryName;

    @Builder
    public CategoryParamDTO(Long categoryId, String categoryName) {
        this.categoryId = categoryId;
        this.categoryName = categoryName;
    }
}
