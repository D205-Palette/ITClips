package com.ssafy.itclips.follow.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.itclips.follow.entity.Follow;
import com.ssafy.itclips.follow.entity.QFollow;
import com.ssafy.itclips.user.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class FollowRepositoryCustomImpl implements FollowRepositoryCustom {

    @Autowired
    private JPAQueryFactory queryFactory;

    private final QFollow follow = QFollow.follow;

    @Override
    public List<Follow> findByFrom(User fromUser) {
        return queryFactory
                .selectFrom(follow)
                .where(follow.from.eq(fromUser))
                .fetch();
    }

    @Override
    public List<Follow> findByTo(User toUser) {
        return queryFactory
                .selectFrom(follow)
                .where(follow.to.eq(toUser))
                .fetch();
    }

    @Override
    public Optional<Follow> findByFromAndTo(User fromUser, User toUser) {
        return Optional.ofNullable(
                queryFactory
                        .selectFrom(follow)
                        .where(follow.from.eq(fromUser)
                                .and(follow.to.eq(toUser)))
                        .fetchOne()
        );
    }

    @Override
    public long countByTo(User user) {
        return queryFactory
                .select(follow.count())
                .from(follow)
                .where(follow.to.eq(user))
                .fetchOne();
    }

    @Override
    public long countByFrom(User user) {
        return queryFactory
                .select(follow.count())
                .from(follow)
                .where(follow.from.eq(user))
                .fetchOne();
    }

    @Override
    public List<Follow> findByFromId(Long userId) {
        return queryFactory
                .selectFrom(follow)
                .where(follow.from.id.eq(userId))
                .fetch();
    }

    @Override
    public List<Follow> findByToId(Long userId) {
        return queryFactory
                .selectFrom(follow)
                .where(follow.to.id.eq(userId))
                .fetch();
    }

    @Override
    public boolean existsByFromUserAndToUser(User fromUser, User toUser) {
        Follow result = queryFactory
                .selectFrom(follow)
                .where(follow.from.eq(fromUser), follow.to.eq(toUser))
                .fetchOne();

        return result != null;
    }
}