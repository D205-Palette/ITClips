package com.ssafy.itclips.user.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
public class UserInfoDTO {
    private String nickname;
    private LocalDate birth;
    private String job;
    private Boolean gender;
    private String bio;

    @Builder
    public UserInfoDTO(String nickname, LocalDate birth, String job, Boolean gender, String bio) {
        this.nickname = nickname;
        this.birth = birth;
        this.job = job;
        this.gender = gender;
        this.bio = bio;
    }

}
