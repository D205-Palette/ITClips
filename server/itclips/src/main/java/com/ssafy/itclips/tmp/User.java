package com.ssafy.itclips.tmp;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import java.time.Instant;

@Getter
@Setter
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
    @Column(name = "role", nullable = false, columnDefinition = "ENUM('ADMIN', 'NORMAL') DEFAULT 'NORMAL'")
    private Role role;

    @ColumnDefault("0")
    @Column(name = "dark_mode")
    private Boolean darkMode;

}