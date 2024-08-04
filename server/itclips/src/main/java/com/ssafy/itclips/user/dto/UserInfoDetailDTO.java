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
    private Long id;
    private String email;
    private String nickname;
    private LocalDate birth;
    private String job;
    private Boolean gender;
    private Boolean darkMode;
    private String bio;
    private int bookmarkListCount;
    private int roadmapCount;
    private long followerCount;
    private long followingCount;

    @Builder
    public UserInfoDetailDTO(Long id, String email, String nickname, LocalDate birth, String job, Boolean gender, Boolean darkMode, String bio,
                             int bookmarkListCount, int roadmapCount,
                             long followerCount, long followingCount) {
        this.id = id;
        this.email = email;
        this.nickname = nickname;
        this.birth = birth;
        this.job = job;
        this.gender = gender;
        this.darkMode = darkMode;
        this.bio = bio;
        this.bookmarkListCount = bookmarkListCount;
        this.roadmapCount = roadmapCount;
        this.followerCount = followerCount;
        this.followingCount = followingCount;
    }

}
