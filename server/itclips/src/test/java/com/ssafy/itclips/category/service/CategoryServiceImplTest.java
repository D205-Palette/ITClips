package com.ssafy.itclips.category.service;

import com.ssafy.itclips.bookmarklist.dto.BookmarkListDTO;
import com.ssafy.itclips.category.repository.CategoryRepository;
import com.ssafy.itclips.bookmarklist.repository.BookmarkListRepository;
import com.ssafy.itclips.tag.dto.TagDTO;
import com.ssafy.itclips.user.entity.Role;
import com.ssafy.itclips.user.entity.User;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;


@SpringBootTest
@Transactional
class CategoryServiceImplTest {

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private CategoryRepository categoryRepository;

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

    }

    @DisplayName("존재하지 않는 북마크 리스트에 대한 예외 확인")
    @Test
    void addCategory_BookmarkListNotFound() {

    }
}
