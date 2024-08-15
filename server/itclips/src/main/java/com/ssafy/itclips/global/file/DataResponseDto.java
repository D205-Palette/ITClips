package com.ssafy.itclips.global.file;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.Map;

@Getter
@Setter
@ToString
public class DataResponseDto {

    private String image;
    private String url;


    @Builder
    public DataResponseDto( String image, String url) {
        this.image = image;
        this.url = url;
    }

    public static DataResponseDto of(Map<String,String> map) {
        return DataResponseDto.builder()
                .image(map.get("image"))
                .url(map.get("url"))
                .build();

    }
}
