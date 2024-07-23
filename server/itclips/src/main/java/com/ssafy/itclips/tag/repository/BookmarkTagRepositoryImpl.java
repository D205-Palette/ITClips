package com.ssafy.itclips.tag.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.itclips.bookmark.entity.Bookmark;
import com.ssafy.itclips.tag.entity.QBookmarkTag;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class BookmarkTagRepositoryImpl implements BookmarkTagRepositoryCustom{

    private final JPAQueryFactory queryFactory;
    @Override
    public void deleteAllByBookmark(Bookmark bookmark) {
        QBookmarkTag bookmarkTag = QBookmarkTag.bookmarkTag;

        queryFactory.delete(bookmarkTag)
                .where(bookmarkTag.bookmark.eq(bookmark))
                .execute();

    }
}
