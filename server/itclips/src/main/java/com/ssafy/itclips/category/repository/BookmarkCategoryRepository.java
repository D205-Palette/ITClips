package com.ssafy.itclips.category.repository;

import com.ssafy.itclips.category.entity.BookmarkCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface BookmarkCategoryRepository extends JpaRepository<BookmarkCategory, Long> {

   Integer countByCategoryId(Long categoryId);
}
