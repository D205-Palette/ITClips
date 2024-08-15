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
    private String bio;
    private String image;
    private int bookmarkListCount;
    private int roadmapCount;
    private long followerCount;
    private long followingCount;
    private boolean isFollowing;
    private boolean isFollowers;


    @Builder
    public UserInfoDetailDTO(Long id, String email, String nickname, LocalDate birth, String job, Boolean gender, String image, String bio,
                             int bookmarkListCount, int roadmapCount,
                             long followerCount, long followingCount,
                             boolean isFollowing, boolean isFollowers) {
        this.id = id;
        this.email = email;
        this.nickname = nickname;
        this.birth = birth;
        this.image = image;
        this.job = job;
        this.gender = gender;
        this.bio = bio;
        this.bookmarkListCount = bookmarkListCount;
        this.roadmapCount = roadmapCount;
        this.followerCount = followerCount;
        this.followingCount = followingCount;
        this.isFollowing = isFollowing;
        this.isFollowers = isFollowers;
    }

    public void setFollowStatus(Boolean isFollowing, Boolean isFollowers) {
        this.isFollowing = isFollowing;
        this.isFollowers = isFollowers;
    }

}
