package com.ssafy.itclips.comment.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.itclips.bookmarklist.entity.QBookmarkList;
import com.ssafy.itclips.comment.dto.CommentResponseDTO;
import com.ssafy.itclips.comment.entity.BookmarkListComment;
import com.ssafy.itclips.comment.entity.QBookmarkListComment;
import com.ssafy.itclips.user.entity.QUser;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class CommentRepositoryImpl implements CommentRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    @Override
    public List<BookmarkListComment> findCommentsByListId(Long listId) {

        QBookmarkList bookmarkList = QBookmarkList.bookmarkList;
        QBookmarkListComment comment = QBookmarkListComment.bookmarkListComment;
        QUser user = QUser.user;

        return queryFactory.selectFrom(comment)
                .join(comment.user, user).fetchJoin()
                .where(comment.bookmarkList.id.eq(listId))
                .fetch();
    }
}
