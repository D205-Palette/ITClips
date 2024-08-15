package com.ssafy.itclips.category.service;

import com.ssafy.itclips.bookmarklist.dto.BookmarkListDTO;
import com.ssafy.itclips.bookmarklist.entity.BookmarkList;
import com.ssafy.itclips.bookmarklist.service.BookmarkListService;
import com.ssafy.itclips.category.dto.CategoryRequestDTO;
import com.ssafy.itclips.category.dto.CategoryParamDTO;
import com.ssafy.itclips.category.entity.Category;
import com.ssafy.itclips.category.repository.CategoryRepository;
import com.ssafy.itclips.bookmarklist.repository.BookmarkListRepository;
import com.ssafy.itclips.error.CustomException;
import com.ssafy.itclips.error.ErrorCode;
import com.ssafy.itclips.tag.dto.TagDTO;
import com.ssafy.itclips.user.entity.Role;
import com.ssafy.itclips.user.entity.User;
import com.ssafy.itclips.user.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;


@SpringBootTest
@Transactional
class CategoryServiceImplTest {

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private BookmarkListService bookmarkListService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BookmarkListRepository bookmarkListRepository;
    private static User user;
    private static BookmarkListDTO bookmarkListDTO;
    @BeforeAll
    static void set() {
        user = User.builder()
                .email("aaa@example.com")
                .password("!23")
                .profileImage("Aaa")
                .nickname("aaysdfa")
                .build();
        user.setId(125125L);
        user.setRole(Role.USER);

        bookmarkListDTO = new BookmarkListDTO();
        bookmarkListDTO.setTitle("Test Bookmark List");
        bookmarkListDTO.setDescription("Description for Test Bookmark List");
        bookmarkListDTO.setImage("image_url");
        bookmarkListDTO.setIsPublic(true);
        bookmarkListDTO.setUsers(List.of("wlsrb6905@naver.com")); // 사용자 추가
        bookmarkListDTO.setTags(List.of(new TagDTO("aaa"), new TagDTO("bbb"))); // 태그 추가
        bookmarkListDTO.setCategories(List.of("Category1","Category2")); // 카테고리 추가
    }
    @DisplayName("카테고리 추가 확인")
    @Test
    void addCategory() {
// 사용자 저장 (테스트를 위해 필요시)
        userRepository.save(user);

        // When
        bookmarkListService.createBookmarkList(user.getId(), bookmarkListDTO);

        // Then
        Optional<BookmarkList> savedBookmarkList = bookmarkListRepository.findByTitle("Test Bookmark List");
        assertThat(savedBookmarkList).isPresent(); // 북마크 목록이 존재하는지 확인
        assertThat(savedBookmarkList.get().getTitle()).isEqualTo("Test Bookmark List"); // 제목 확인

        // 카테고리 DTO 생성
        CategoryRequestDTO categoryRequestDTO = new CategoryRequestDTO();
        categoryRequestDTO.setCategoryName("Test Category");

        // 카테고리 추가
        CategoryParamDTO savedCategory = categoryService.addCategory(userId, savedBookmarkList.get().getId(), categoryRequestDTO);

        // 저장된 카테고리 확인
        assertThat(savedCategory.getCategoryName()).isEqualTo("Test Category");
    }

    @DisplayName("존재하지 않는 북마크 리스트에 대한 예외 확인")
    @Test
    void addCategory_BookmarkListNotFound() {
        // 카테고리 DTO 생성
        CategoryRequestDTO categoryRequestDTO = new CategoryRequestDTO();
        categoryRequestDTO.setCategoryName("Test Category");

        // 존재하지 않는 ID로 카테고리 추가 시도 및 예외 발생 확인
        Long nonExistentListId = 999L;

        assertThatThrownBy(() -> {
            categoryService.addCategory(userId, nonExistentListId, categoryRequestDTO);
        }).isInstanceOf(CustomException.class)
                .hasMessageContaining(ErrorCode.BOOKMARK_LIST_NOT_FOUND.getMessage());
    }

    @DisplayName("카테고리 삭제 확인")
    @Test
    void deleteCategory() {
        // 사용자 저장 (테스트를 위해 필요시)
        userRepository.save(user);

        // 북마크 리스트 생성
        bookmarkListService.createBookmarkList(user.getId(), bookmarkListDTO);

        // 카테고리 DTO 생성
        CategoryRequestDTO categoryRequestDTO = new CategoryRequestDTO();
        categoryRequestDTO.setCategoryName("Test Category");

        // 카테고리 추가
        CategoryParamDTO savedCategory = categoryService.addCategory(userId, bookmarkListRepository.findByTitle("Test Bookmark List").get().getId(), categoryRequestDTO);

        // When: 카테고리 삭제
        categoryService.deleteCategory(userId, savedCategory.getCategoryId());

        // Then: 카테고리가 삭제되었는지 확인
        Optional<Category> deletedCategory = categoryRepository.findById(savedCategory.getCategoryId());
        assertThat(deletedCategory).isNotPresent(); // 카테고리가 존재하지 않아야 함
    }

    @DisplayName("카테고리 업데이트 확인")
    @Test
    void updateCategory() {
        // 사용자 저장 (테스트를 위해 필요시)
        userRepository.save(user);

        // 북마크 리스트 생성
        bookmarkListService.createBookmarkList(user.getId(), bookmarkListDTO);

        // 카테고리 DTO 생성
        CategoryRequestDTO categoryDTO = new CategoryRequestDTO();
        categoryDTO.setCategoryName("Test Category");

        // 카테고리 추가
        CategoryParamDTO savedCategory = categoryService.addCategory(userId, bookmarkListRepository.findByTitle("Test Bookmark List").get().getId(), categoryDTO);

        // 카테고리 업데이트 요청 DTO 생성
        CategoryRequestDTO categoryRequestDTO = new CategoryRequestDTO();
        categoryRequestDTO.setCategoryName("Updated Category Name");

        // When: 카테고리 업데이트
        CategoryParamDTO updatedCategory = categoryService.updateCategory(userId, savedCategory.getCategoryId(), categoryRequestDTO);

        // Then: 카테고리 정보가 업데이트되었는지 확인
        assertThat(updatedCategory).isNotNull();
        assertThat(updatedCategory.getCategoryId()).isEqualTo(savedCategory.getCategoryId());
        assertThat(updatedCategory.getCategoryName()).isEqualTo("Updated Category Name");

        // 추가로 카테고리가 실제로 업데이트 되었는지 확인
        Category updatedEntity = categoryRepository.findById(savedCategory.getCategoryId()).orElse(null);
        assertThat(updatedEntity).isNotNull();
        assertThat(updatedEntity.getName()).isEqualTo("Updated Category Name");
    }


}
