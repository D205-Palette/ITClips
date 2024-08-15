package com.ssafy.itclips.global.gpt;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
public class GPTResponseDTO {

    private String summary;

    @Builder
    public GPTResponseDTO(String summary) {
        this.summary = summary;
    }

    public static GPTResponseDTO of(ChatGPTResponse chatGPTResponse) {
        return GPTResponseDTO.builder()
                .summary(chatGPTResponse.getChoices().get(0).getMessage().getContent())
                .build();
    }
}
