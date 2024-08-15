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
    private Long id;
    private String email;
    private String nickname;
    private LocalDate birth;
    private String job;
    private Boolean gender;
    private Boolean darkMode;
    private String bio;

    @Builder
    public UserInfoDTO(Long id, String email, String nickname, LocalDate birth, String job, Boolean gender, Boolean darkMode, String bio) {
        this.id = id;
        this.email = email;
        this.nickname = nickname;
        this.birth = birth;
        this.job = job;
        this.gender = gender;
        this.darkMode = darkMode;
        this.bio = bio;
    }

}
