package com.ssafy.itclips.bookmark.repository;

import com.ssafy.itclips.bookmark.entity.Bookmark;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

public interface BookmarkRepository extends JpaRepository<Bookmark, Long> {

    Bookmark findByTitle(String title);
}
