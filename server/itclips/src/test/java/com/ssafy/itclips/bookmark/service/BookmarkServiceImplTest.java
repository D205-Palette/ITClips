package com.ssafy.itclips.bookmark.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;

import com.ssafy.itclips.bookmark.dto.BookmarkRequestDTO;
import com.ssafy.itclips.bookmark.entity.Bookmark;
import com.ssafy.itclips.bookmark.repository.BookmarkRepository;
import com.ssafy.itclips.bookmark.service.BookmarkService;
import com.ssafy.itclips.bookmarklist.dto.BookmarkListDTO;
import com.ssafy.itclips.bookmarklist.entity.BookmarkList;
import com.ssafy.itclips.bookmarklist.repository.BookmarkListRepository;
import com.ssafy.itclips.bookmarklist.service.BookmarkListService;
import com.ssafy.itclips.category.repository.CategoryRepository;
import com.ssafy.itclips.error.CustomException;
import com.ssafy.itclips.error.ErrorCode;
import com.ssafy.itclips.tag.dto.TagDTO;
import com.ssafy.itclips.user.entity.Role;
import com.ssafy.itclips.user.entity.User;
import com.ssafy.itclips.user.repository.UserRepository;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@SpringBootTest
@Transactional
class BookmarkServiceImplTest {

    @Autowired
    private BookmarkService bookmarkService;

    @Autowired
    private BookmarkRepository bookmarkRepository;

    @Autowired
    private BookmarkListService bookmarkListService;

    @Autowired
    private BookmarkListRepository bookmarkListRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private UserRepository userRepository;

    private static User user;
    private static BookmarkRequestDTO bookmarkRequestDTO;

    @BeforeAll
    static void setUp() {
        user = User.builder()
                .email("aaa@example.com")
                .password("!23")
                .profileImage("Aaa")
                .nickname("aaysdfa")
                .build();
        user.setId(125125L);
        user.setRole(Role.USER);



        bookmarkRequestDTO = new BookmarkRequestDTO();
        bookmarkRequestDTO.setTitle("Test Bookmark");
        bookmarkRequestDTO.setUrl("http://example.com");
        bookmarkRequestDTO.setTags(List.of(new TagDTO("tag1"), new TagDTO("tag2"))); // 태그 추가
    }

    @DisplayName("북마크 생성 확인")
    @Test
    void createBookmark() {
        // 사용자 저장 (테스트를 위해 필요시)
        userRepository.save(user);

        // 북마크 리스트 생성
        BookmarkListDTO bookmarkListDTO = new BookmarkListDTO();
        bookmarkListDTO.setTitle("Test Bookmark List");
        bookmarkListDTO.setDescription("Description for Test Bookmark List");
        bookmarkListDTO.setIsPublic(true);
        bookmarkListDTO.setUsers(null); // 사용자 추가

        // 북마크 리스트 생성
        bookmarkListService.createBookmarkList(user.getId(), bookmarkListDTO);

        // When
        Optional<BookmarkList> savedBookmarkList = bookmarkListRepository.findByTitle("Test Bookmark List");
        assertThat(savedBookmarkList).isPresent(); // 북마크 목록이 존재하는지 확인

        // 북마크 생성
        bookmarkService.createBookmark(savedBookmarkList.get().getId(), savedBookmarkList.get().getCategories().get(0).getId(), bookmarkRequestDTO);

        // Then
        // 북마크가 잘 생성되었는지 확인
        assertThat(bookmarkRepository.findByTitle("Test Bookmark")).isNotNull();
    }

    @DisplayName("존재하지 않는 북마크 리스트로 북마크 생성 시 예외 발생")
    @Test
    void createBookmark_BookmarkListNotFound() {
        // When & Then
        CustomException exception = assertThrows(CustomException.class, () -> {
            bookmarkService.createBookmark(999L, 1L, bookmarkRequestDTO); // 존재하지 않는 리스트 ID 사용
        });
        assertThat(exception.getErrorCode()).isEqualTo(ErrorCode.BOOKMARK_LIST_NOT_FOUND);
    }

    @DisplayName("존재하지 않는 카테고리로 북마크 생성 시 예외 발생")
    @Test
    void createBookmark_CategoryNotFound() {
        // 사용자 저장 (테스트를 위해 필요시)
        userRepository.save(user);
        // 북마크 리스트 생성
        BookmarkListDTO bookmarkListDTO = new BookmarkListDTO();
        bookmarkListDTO.setTitle("Test Bookmark List");
        bookmarkListDTO.setDescription("Description for Test Bookmark List");
        bookmarkListDTO.setIsPublic(true);
        bookmarkListDTO.setUsers(null); // 사용자 추가

        // 북마크 리스트 생성
        bookmarkListService.createBookmarkList(user.getId(), bookmarkListDTO);

        Optional<BookmarkList> savedBookmarkList = bookmarkListRepository.findByTitle("Test Bookmark List");
        assertThat(savedBookmarkList).isPresent(); // 북마크 목록이 존재하는지 확인

        // When & Then
        CustomException exception = assertThrows(CustomException.class, () -> {
            bookmarkService.createBookmark(savedBookmarkList.get().getId(), 999L, bookmarkRequestDTO); // 존재하지 않는 카테고리 ID 사용
        });
        assertThat(exception.getErrorCode()).isEqualTo(ErrorCode.CATEGORY_NOT_FOUND);
    }
}
