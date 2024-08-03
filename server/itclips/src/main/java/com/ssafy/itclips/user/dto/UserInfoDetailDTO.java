package com.ssafy.itclips.user.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
public class UserInfoDetailDTO {
    private String nickname;
    private LocalDate birth;
    private String job;
    private Boolean gender;
    private Boolean darkMode;
    private String bio;
    private int bookmarkListCount;
    private int roadmapCount;

    @Builder
    public UserInfoDetailDTO(String nickname, LocalDate birth, String job, Boolean gender, Boolean darkMode, String bio, int bookmarkListCount, int roadmapCount) {
        this.nickname = nickname;
        this.birth = birth;
        this.job = job;
        this.gender = gender;
        this.darkMode = darkMode;
        this.bio = bio;
        this.bookmarkListCount = bookmarkListCount;
        this.roadmapCount = roadmapCount;
    }

}
