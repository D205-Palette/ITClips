package com.ssafy.itclips.bookmark.dto;

import com.ssafy.itclips.bookmark.entity.Bookmark;
import com.ssafy.itclips.global.gpt.ChatGPTResponse;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
public class BookmarkSummaryDTO {

    private String summary;

    @Builder
    public BookmarkSummaryDTO(String summary) {
        this.summary = summary;
    }

    public static BookmarkSummaryDTO of(ChatGPTResponse chatGPTResponse) {
        return BookmarkSummaryDTO.builder()
                .summary(chatGPTResponse.getChoices().get(0).getMessage().getContent())
                .build();
    }
}
