package com.ssafy.itclips.comment.repository;

import com.ssafy.itclips.comment.entity.BookmarkListComment;

import java.util.List;

public interface CommentRepositoryCustom {
    List<BookmarkListComment> findCommentsByListId(Long listId);
}
