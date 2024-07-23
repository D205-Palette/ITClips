package com.ssafy.itclips.bookmark.repository;

import com.ssafy.itclips.bookmark.entity.BookmarkCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BookmarkCategoryRepository extends JpaRepository<BookmarkCategory, Long> {

   Long countByCategoryId(Long categoryId);
}
