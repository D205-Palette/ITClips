package com.ssafy.itclips.comment.repository;

import com.ssafy.itclips.comment.entity.BookmarkListComment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentRepository extends JpaRepository<BookmarkListComment, Long> {
}
