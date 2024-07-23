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
import com.ssafy.itclips.tag.entity.BookmarkTag;
import com.ssafy.itclips.tag.entity.Tag;
import com.ssafy.itclips.tag.repository.BookmarkTagRepository;
import com.ssafy.itclips.user.entity.Role;
import com.ssafy.itclips.user.entity.User;
import com.ssafy.itclips.user.repository.UserRepository;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
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
    @Autowired
    private BookmarkTagRepository bookmarkTagRepository;

    @BeforeEach
    void setUp() {
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
        Bookmark bookmark = bookmarkRepository.findByTitle("Test Bookmark");
        // Then
        // 북마크가 잘 생성되었는지 확인
        assertThat(bookmark).isNotNull();
    }

    @DisplayName("북마크 업데이트 확인")
    @Test
    void updateBookmark() {
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
        // 북마크 생성
        bookmarkService.createBookmark(savedBookmarkList.get().getId(), savedBookmarkList.get().getCategories().get(0).getId(), bookmarkRequestDTO);
        Bookmark existingBookmark = bookmarkRepository.findByTitle("Test Bookmark");
        bookmarkRequestDTO.setTitle("updated");
        bookmarkRequestDTO.setContent("updated");
        bookmarkRequestDTO.setTags(List.of(new TagDTO("tag3"), new TagDTO("tag4")));

        // When
        bookmarkService.updateBookmark(existingBookmark.getId(), bookmarkRequestDTO);
        // Then
        Optional<Bookmark> updatedBookmark = bookmarkRepository.findById(existingBookmark.getId());
        assertThat(updatedBookmark).isPresent(); // 북마크가 존재하는지 확인
        assertThat(updatedBookmark.get().getTitle()).isEqualTo("updated"); // 제목이 업데이트 되었는지 확인
        assertThat(updatedBookmark.get().getDescription()).isEqualTo("updated"); // 설명이 업데이트 되었는지 확인

        // 태그가 올바르게 저장되었는지 확인
        List<BookmarkTag> updatedTags = bookmarkTagRepository.findByBookmarkId(updatedBookmark.get().getId());
        assertThat(updatedTags).extracting(tag -> tag.getTag().getTitle()) // 각 태그의 제목 가져오기
                .containsExactlyInAnyOrder("Tag3", "Tag4"); // 새로운 태그 제목 확인
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

    @Test
    @DisplayName("북마크 삭제 테스트")
    void deleteBookmark() {
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
        Bookmark bookmark = bookmarkRepository.findByTitle("Test Bookmark");
        // Then
        // 북마크가 잘 생성되었는지 확인
        assertThat(bookmark).isNotNull();

        bookmarkService.deleteBookmark(bookmark.getId());
        // Then
        Optional<Bookmark> deletedBookmark = bookmarkRepository.findById(bookmark.getId());
        assertThat(deletedBookmark).isNotPresent(); // 북마크가 존재하지 않는지 확인

    }


}
