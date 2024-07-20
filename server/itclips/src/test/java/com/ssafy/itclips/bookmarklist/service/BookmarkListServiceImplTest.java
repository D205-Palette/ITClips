package com.ssafy.itclips.bookmarklist.service;

import com.ssafy.itclips.bookmarklist.dto.BookmarkListDTO;
import com.ssafy.itclips.bookmarklist.entity.BookmarkList;
import com.ssafy.itclips.bookmarklist.repository.BookmarkListRepository;
import com.ssafy.itclips.error.CustomException;
import com.ssafy.itclips.error.ErrorCode;
import com.ssafy.itclips.tmp.user.User;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
class BookmarkListServiceImplTest {

    @Autowired
    private BookmarkListService bookmarkListService;

    @Autowired
    private BookmarkListRepository bookmarkListRepository;

    @DisplayName("북마크 목록 추가 확인")
    @Test
    void createBookmarkList() {
        // Given
        User user = User.builder()
                .email("aaa")
                .password("!23")
                .profileImage("Aaa")
                .nickname("aaa")
                .build();
        BookmarkListDTO bookmarkListDTO = new BookmarkListDTO();
        bookmarkListDTO.setTitle("Test Bookmark List");
        bookmarkListDTO.setDescription("Description for Test Bookmark List");
        bookmarkListDTO.setImage("image_url");
        bookmarkListDTO.setIsPublic(true);

        // When
        bookmarkListService.createBookmarkList(1L, bookmarkListDTO);

        // Then
        Optional<BookmarkList> savedBookmarkList = bookmarkListRepository.findByTitle("Test Bookmark List");
        assertThat(savedBookmarkList).isPresent(); // 북마크 목록이 존재하는지 확인
        assertThat(savedBookmarkList.get().getTitle()).isEqualTo("Test Bookmark List"); // 제목 확인
    }

    @DisplayName("존재하지 않는 사용자로 북마크 목록 추가 시 예외 발생 확인")
    @Test
    void createBookmarkList_UserNotFound() {
        // Given
        BookmarkListDTO bookmarkListDTO = new BookmarkListDTO();
        bookmarkListDTO.setTitle("Test Bookmark List");
        bookmarkListDTO.setDescription("Description for Test Bookmark List");
        bookmarkListDTO.setImage("image_url");
        bookmarkListDTO.setIsPublic(true);

        // When & Then
        CustomException exception = assertThrows(CustomException.class, () -> {
            bookmarkListService.createBookmarkList(999L, bookmarkListDTO); // 존재하지 않는 사용자 ID
        });
        assertThat(exception.getErrorCode()).isEqualTo(ErrorCode.USER_NOT_FOUND);
    }
}