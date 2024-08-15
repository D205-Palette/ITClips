package com.ssafy.itclips.category.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.itclips.bookmarklist.entity.BookmarkList;
import com.ssafy.itclips.category.entity.QCategory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class CategoryRepositoryImpl implements CategoryRepositoryCustom {

    private final JPAQueryFactory queryFactory;


    @Override
    public void deleteAllByBookmarklList(BookmarkList bookmarkList) {
        QCategory category = QCategory.category; // QCategory 객체 생성

        queryFactory.delete(category)
                .where(category.bookmarklist.eq(bookmarkList)) // 조건 설정
                .execute(); // 쿼리 실행
    }
}
