package com.ssafy.itclips.bookmarklist.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.itclips.bookmarklist.entity.BookmarkList;
import com.ssafy.itclips.bookmarklist.entity.QBookmarkList;
import com.ssafy.itclips.group.entity.QUserGroup;
import com.ssafy.itclips.tag.entity.QBookmarkListTag;
import com.ssafy.itclips.tag.entity.QTag;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class BookmarkListRepositoryImpl implements BookmarkListRepositoryCustom {

    private final JPAQueryFactory queryFactory;


    @Override
    public List<BookmarkList> findDetailedByUserId(Long userId) {
        QBookmarkList bookmarkList = QBookmarkList.bookmarkList;
        QUserGroup userGroup = QUserGroup.userGroup;
        QTag tag = QTag.tag;
        QBookmarkListTag bookmarkListTag = QBookmarkListTag.bookmarkListTag;

        return queryFactory.selectFrom(bookmarkList)
                .leftJoin(bookmarkList.groups, userGroup).fetchJoin()
                .leftJoin(bookmarkList.tags, bookmarkListTag).fetchJoin()
                .leftJoin(bookmarkListTag.tag, tag).fetchJoin()
                .where(bookmarkList.user.id.eq(userId))
                .fetch();
    }
}
