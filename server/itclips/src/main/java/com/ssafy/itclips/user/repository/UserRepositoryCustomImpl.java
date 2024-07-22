package com.ssafy.itclips.user.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.itclips.user.entity.QUser;
import com.ssafy.itclips.user.entity.User;
import lombok.RequiredArgsConstructor;

import java.util.List;

@RequiredArgsConstructor
public class UserRepositoryCustomImpl implements UserRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    @Override
    public List<User> findByEmails(List<String> emails) {
        QUser user = QUser.user;
        return queryFactory.selectFrom(user)
                .where(user.email.in(emails))
                .fetch();
    }
}
