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

    private String url;


    @Builder
    public DataResponseDto( String url) {
        this.url = url;
    }

    public static DataResponseDto of(Map<String,String> map) {
        return DataResponseDto.builder()
                .url(map.get("url"))
                .build();

    }
}
