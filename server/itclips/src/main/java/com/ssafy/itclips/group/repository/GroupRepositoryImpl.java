package com.ssafy.itclips.group.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.itclips.bookmarklist.entity.BookmarkList;
import com.ssafy.itclips.bookmarklist.repository.BookmarkListRepository;
import com.ssafy.itclips.group.entity.QUserGroup;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class GroupRepositoryImpl implements GroupRepositoryCustom {

    private final JPAQueryFactory queryFactory;
    @Override
    public void deleteByBookmarkListAndUserIdNot(BookmarkList bookmarkList, Long userId) {
        QUserGroup userGroup = QUserGroup.userGroup;

        // 조건에 맞는 UserGroup 삭제
        queryFactory.delete(userGroup)
                .where(userGroup.bookmarkList.eq(bookmarkList)
                        .and(userGroup.user.id.ne(userId)))
                .execute();
    }
}
