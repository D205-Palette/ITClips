package com.ssafy.itclips.bookmarklist.repository;

import com.ssafy.itclips.bookmarklist.entity.BookmarkList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BookmarkListRepository extends JpaRepository<BookmarkList, Long> {

    Optional<BookmarkList> findByTitle(String title);
}

