package com.ssafy.itclips.user.entity;

import com.ssafy.itclips.chat.entity.Chat;
import com.ssafy.itclips.bookmark.entity.BookmarkLike;
import com.ssafy.itclips.follow.entity.Follow;
import com.ssafy.itclips.report.entity.BookmarkListReport;
import com.ssafy.itclips.report.entity.BookmarkReport;
import com.ssafy.itclips.bookmarklist.entity.BookmarkListScrap;
import com.ssafy.itclips.bookmarklist.entity.BookmarkListLike;
import com.ssafy.itclips.bookmarklist.entity.BookmarkList;
import com.ssafy.itclips.comment.entity.BookmarkListComment;
import com.ssafy.itclips.group.entity.UserGroup;
import com.ssafy.itclips.roadmap.entity.Roadmap;
import com.ssafy.itclips.roadmap.entity.RoadmapLike;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "user", schema = "itclips")
public class User {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Size(max = 255)
    @NotNull(message = "Email cannot be null")
    @Column(name = "email", nullable = false)
    private String email;

    @Size(max = 511)
    @NotNull(message = "Password cannot be null")
    @Column(name = "password", nullable = false, length = 511)
    private String password;

    @Size(max = 50)
    @NotNull(message = "Nickname cannot be null")
    @Column(name = "nickname", nullable = false, length = 50)
    private String nickname;

    @Size(max = 255)
    @Column(name = "profile_image")
    private String profileImage;

    @ColumnDefault("CURRENT_TIMESTAMP")
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @ColumnDefault("CURRENT_TIMESTAMP")
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @Column(name = "birth")
    private LocalDate birth;

    @Size(max = 50)
    @Column(name = "job", length = 50)
    private String job;

    @Column(name = "gender")
    private Boolean gender;

    @Size(max = 511)
    @Column(name = "refresh_token", length = 511)
    private String refreshToken;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    @Column(name = "dark_mode", nullable = false)
    private Boolean darkMode;


    //chat
    //역방향 user가 속한 chatroom을 알기 위함
    @OneToMany(mappedBy = "user")
    private List<Chat> chatList = new ArrayList<Chat>();

    @Column(name = "provider")
    private String provider;

    @Column(name = "bio")
    private String bio;

    @OneToMany(mappedBy = "user")
    private List<BookmarkList> bookmarkLists = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<UserGroup> groups = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private Set<UserTag> userTags = new LinkedHashSet<>();

    public User update(String nickname, String profileImage) {
        this.nickname = nickname;
        this.profileImage = profileImage;
        this.updatedAt = LocalDateTime.now();
        return this;
    }

    @OneToMany(mappedBy = "user")
    private List<Roadmap> roadmapList = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<RoadmapLike> roadmapLikeList = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<BookmarkListComment> bookmarkListComments = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<BookmarkListLike> bookmarkListLikes = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<BookmarkListScrap> bookmarkListScraps = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<BookmarkLike> bookmarkLikes = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<BookmarkReport> bookmarkReports = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<BookmarkListReport> bookmarkListReports = new ArrayList<>();

    @OneToMany(mappedBy = "from", fetch = FetchType.LAZY)
    private List<Follow> followings;

    @OneToMany(mappedBy = "to", fetch = FetchType.LAZY)
    private List<Follow> followers;

    public String getRoleKey() {
        return this.role.getKey();
    }

    public void addBookmarkList(BookmarkList bookmarkList) {
        bookmarkLists.add(bookmarkList);
        bookmarkList.setUser(this);
    }

    public void setGroups(BookmarkList bookmarkList, UserGroup group) {
        group.setUser(this);
        group.setBookmarkList(bookmarkList);
        bookmarkList.getGroups().add(group);
        groups.add(group);
    }

    @Builder
    public User(Long id, String email, String password, String nickname, String profileImage,
                LocalDateTime createdAt, LocalDateTime updatedAt, LocalDate birth, String job, Boolean gender,
                String refreshToken, Role role, Boolean darkMode, String provider) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.nickname = nickname;
        this.profileImage = profileImage;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.birth = birth;
        this.job = job;
        this.gender = gender;
        this.refreshToken = refreshToken;
        this.role = role;
        this.darkMode = darkMode;
        this.provider = provider;
    }
}