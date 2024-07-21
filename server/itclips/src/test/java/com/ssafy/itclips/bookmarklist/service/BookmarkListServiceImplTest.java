package com.ssafy.itclips.bookmarklist.service;

import com.ssafy.itclips.bookmarklist.dto.BookmarkListDTO;
import com.ssafy.itclips.bookmarklist.entity.BookmarkList;
import com.ssafy.itclips.bookmarklist.repository.BookmarkListRepository;
import com.ssafy.itclips.category.entity.Category;
import com.ssafy.itclips.category.repository.CategoryRepository;
import com.ssafy.itclips.error.CustomException;
import com.ssafy.itclips.error.ErrorCode;
import com.ssafy.itclips.group.entity.UserGroup;
import com.ssafy.itclips.group.repository.GroupRepository;
import com.ssafy.itclips.tag.dto.TagDTO;
import com.ssafy.itclips.tag.entity.BookmarkListTag;
import com.ssafy.itclips.tag.entity.Tag;
import com.ssafy.itclips.tag.repository.BookmarkListTagRepository;
import com.ssafy.itclips.tag.repository.TagRepository;
import com.ssafy.itclips.tmp.Role;
import com.ssafy.itclips.tmp.user.User;
import com.ssafy.itclips.tmp.user.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;

@SpringBootTest
@Transactional
class BookmarkListServiceImplTest {

    @Autowired
    private BookmarkListService bookmarkListService;

    @Autowired
    private BookmarkListRepository bookmarkListRepository;
    @Autowired
    private UserRepository userRepository; // UserRepository 추가

    @Autowired
    private CategoryRepository categoryRepository; // CategoryRepository 추가

    @Autowired
    private TagRepository tagRepository; // TagRepository 추가

    @Autowired
    private GroupRepository groupRepository; // UserGroupRepository 추가

    @Autowired
    private BookmarkListTagRepository bookmarkListTagRepository;




    @DisplayName("북마크 목록 추가 확인")
    @Test
    void createBookmarkList() {
        // Given
        User user = User.builder()
                .email("aaa@example.com")
                .password("!23")
                .profileImage("Aaa")
                .nickname("aaysdfa")
                .build();
        user.setId(125125L);
        user.setRole(Role.NORMAL);
        // 사용자 저장 (테스트를 위해 필요시)
        userRepository.save(user);

        BookmarkListDTO bookmarkListDTO = new BookmarkListDTO();
        bookmarkListDTO.setTitle("Test Bookmark List");
        bookmarkListDTO.setDescription("Description for Test Bookmark List");
        bookmarkListDTO.setImage("image_url");
        bookmarkListDTO.setIsPublic(true);
        bookmarkListDTO.setUsers(List.of("wlsrb6905@naver.com")); // 사용자 추가
        bookmarkListDTO.setTags(List.of(new TagDTO("aaa"), new TagDTO("bbb"))); // 태그 추가
        bookmarkListDTO.setCategories(List.of("Category1","Category2")); // 카테고리 추가

        // When
        bookmarkListService.createBookmarkList(user.getId(), bookmarkListDTO);

        // Then
        Optional<BookmarkList> savedBookmarkList = bookmarkListRepository.findByTitle("Test Bookmark List");
        assertThat(savedBookmarkList).isPresent(); // 북마크 목록이 존재하는지 확인
        assertThat(savedBookmarkList.get().getTitle()).isEqualTo("Test Bookmark List"); // 제목 확인

        // 추가된 카테고리 확인
        List<Category> savedCategories = categoryRepository.findAllByBookmarklist(savedBookmarkList.get());
        assertThat(savedCategories).extracting(Category::getName)
                .containsExactlyInAnyOrder("Category1", "Category2"); // 카테고리 이름 확인

        // 추가된 태그 확인
        List<Tag> savedTags = tagRepository.findAll();
        assertThat(savedTags.stream().map(Tag::getTitle)).contains("Aaa", "Bbb"); // 태그 이름 확인

        // 관계 확인
        // 추가된 북마크 목록 태그 확인
        List<BookmarkListTag> savedBookmarkListTags = bookmarkListTagRepository.findByBookmarkListId(savedBookmarkList.get().getId());
        assertThat(savedBookmarkListTags.stream()
                .map(bookmarkListTag -> bookmarkListTag.getTag().getTitle())) // Tag의 title 가져오기
                .containsExactlyInAnyOrder("Aaa", "Bbb"); // 특정 title 확인


        // 추가된 사용자 그룹에서 이메일 확인
        List<UserGroup> savedUserGroupsByBookmarkList = groupRepository.findByBookmarkListId(savedBookmarkList.get().getId());
        List<String> userEmails = savedUserGroupsByBookmarkList.stream()
                .map(userGroup -> userGroup.getUser().getEmail())
                .collect(Collectors.toList());

        assertThat(userEmails).contains("aaa@example.com", "wlsrb6905@naver.com"); // 특정 이메일이 포함되었는지 확인


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
