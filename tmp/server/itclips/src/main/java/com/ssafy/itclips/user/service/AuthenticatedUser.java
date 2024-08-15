package com.ssafy.itclips.user.service;

import com.ssafy.itclips.user.entity.User;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class AuthenticatedUser {

    private final UserService userService;

    public AuthenticatedUser(UserService userService) {
        this.userService = userService;
    }

    public User getCurrentAuthenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();


        if (authentication == null || !authentication.isAuthenticated()) {
            return null;
        }

        Object principal = authentication.getPrincipal();

        // principal이 User 인스턴스일 때
        if (principal instanceof User) {
            return (User) principal;
        }

        // principal이 UserDetails 인스턴스일 때
        if (principal instanceof UserDetails) {
            String email = ((UserDetails) principal).getUsername();
            return userService.getUserByEmail(email);
        }

        return null;
    }

    public Long getCurrentAuthenticatedUserId() {
        User currentUser = getCurrentAuthenticatedUser();
        return (currentUser != null) ? currentUser.getId() : null;
    }
}
