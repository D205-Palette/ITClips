package com.ssafy.itclips.tmp.user.repository;

import com.ssafy.itclips.tmp.user.User;

import java.util.List;

public interface UserRepositoryCustom {
    List<User> findByEmails(List<String> emails);
}
