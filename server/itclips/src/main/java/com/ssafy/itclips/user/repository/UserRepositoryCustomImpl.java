package com.ssafy.itclips.user.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.itclips.user.entity.QUser;
import com.ssafy.itclips.user.entity.Role;
import com.ssafy.itclips.user.entity.User;
import lombok.RequiredArgsConstructor;

import java.util.List;

@RequiredArgsConstructor
public class UserRepositoryCustomImpl implements UserRepositoryCustom {

    private final JPAQueryFactory queryFactory;
    private static final Integer PAGE_SIZE = 8;

    @Override
    public List<User> findByEmails(List<String> emails) {
        QUser user = QUser.user;
        return queryFactory.selectFrom(user)
                .where(user.email.in(emails))
                .fetch();
    }

    @Override
    public List<User> findUserWithNickName(String nickname, Integer pageNo) {
        QUser qUser = QUser.user;
        int offset = (pageNo - 1) * PAGE_SIZE;

        return queryFactory.select(qUser)
                .from(qUser)
                .where(qUser.nickname.contains(nickname)
                        .and(qUser.role.eq(Role.USER)))
                .offset(offset)
                .limit(PAGE_SIZE)
                .fetch();
    }
}
