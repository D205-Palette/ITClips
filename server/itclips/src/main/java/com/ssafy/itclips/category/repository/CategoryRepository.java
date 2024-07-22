package com.ssafy.itclips.category.repository;

import com.ssafy.itclips.bookmarklist.entity.BookmarkList;
import com.ssafy.itclips.category.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long>, CategoryRepositoryCustom {

    List<Category> findAllByBookmarklist(BookmarkList bookmarklist);

}
