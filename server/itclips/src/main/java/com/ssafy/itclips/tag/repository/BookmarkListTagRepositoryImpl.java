package com.ssafy.itclips.tag.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.itclips.bookmarklist.entity.BookmarkList;
import com.ssafy.itclips.tag.entity.QBookmarkListTag;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class BookmarkListTagRepositoryImpl implements BookmarkListTagRepositoryCustom {

    private final JPAQueryFactory queryFactory;


    @Override
    public void deleteAllByBookmarklList(BookmarkList bookmarkList) {
        QBookmarkListTag bookmarkListTag = QBookmarkListTag.bookmarkListTag;

        queryFactory.delete(bookmarkListTag)
                .where(bookmarkListTag.bookmarkList.eq(bookmarkList))
                .execute();
    }
}
