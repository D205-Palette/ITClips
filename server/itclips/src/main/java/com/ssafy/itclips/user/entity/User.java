package com.ssafy.itclips.user.entity;

import com.ssafy.itclips.bookmarklist.entity.BookmarkList;
import com.ssafy.itclips.group.entity.UserGroup;
import com.ssafy.itclips.roadmap.entity.Roadmap;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import java.time.Instant;
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
    @Id
    @Column(name = "id", nullable = false)
    private Long id;

    @Size(max = 255)
    @NotNull
    @Column(name = "email", nullable = false)
    private String email;

    @Size(max = 511)
    @NotNull
    @Column(name = "password", nullable = false, length = 511)
    private String password;

    @Size(max = 50)
    @NotNull
    @Column(name = "nickname", nullable = false, length = 50)
    private String nickname;

    @Size(max = 255)
    @Column(name = "profile_image")
    private String profileImage;

    @ColumnDefault("CURRENT_TIMESTAMP")
    @Column(name = "created_at")
    private Instant createdAt;

    @ColumnDefault("CURRENT_TIMESTAMP")
    @Column(name = "updated_at")
    private Instant updatedAt;

    @Column(name = "birth")
    private Instant birth;

    @Size(max = 50)
    @Column(name = "job", length = 50)
    private String job;

    @Column(name = "gender")
    private Boolean gender;

    @Size(max = 511)
    @Column(name = "refresh_token", length = 511)
    private String refreshToken;

    @Enumerated(EnumType.STRING)
    @Column(name = "role", nullable = false, columnDefinition = "ENUM('USER', 'ADMIN') DEFAULT 'USER'")
    private Role role;

    @ColumnDefault("0")
    @Column(name = "dark_mode")
    private Boolean darkMode;

    @Column(name = "provider")
    private String provider;

    @OneToMany(mappedBy = "user")
    private List<BookmarkList> bookmarkLists = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<UserGroup> groups = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private Set<UserTag> userTags = new LinkedHashSet<>();

    @OneToMany(mappedBy = "user")
    private List<Roadmap> roadmapList = new ArrayList<>();

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
    public User(String email, String password, String nickname, String profileImage) {
        this.email = email;
        this.password = password;
        this.nickname = nickname;
        this.profileImage = profileImage;
    }
}