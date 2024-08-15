package com.ssafy.itclips.category.service;

import com.ssafy.itclips.bookmarklist.entity.BookmarkList;
import com.ssafy.itclips.bookmarklist.repository.BookmarkListRepository;
import com.ssafy.itclips.category.dto.CategoryRequestDTO;
import com.ssafy.itclips.category.dto.CategoryParamDTO;
import com.ssafy.itclips.category.entity.Category;
import com.ssafy.itclips.category.repository.CategoryRepository;
import com.ssafy.itclips.error.CustomException;
import com.ssafy.itclips.error.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;
    private final BookmarkListRepository bookmarkListRepository;

    @Override
    @Transactional
    public CategoryParamDTO addCategory(Long userId, Long listId, CategoryRequestDTO categoryRequestDTO) throws RuntimeException{
        // 기존 북마크 목록을 조회
        BookmarkList existingBookmarkList = bookmarkListRepository.findById(listId)
                .orElseThrow(() -> new CustomException(ErrorCode.BOOKMARK_LIST_NOT_FOUND));
        if(existingBookmarkList.getUser().getId() != userId) {
            throw new CustomException(ErrorCode.UNAUTHORIZED_USER);
        }
        Category existingCategory = categoryRepository.findByName(categoryRequestDTO.getCategoryName());

        if(existingCategory != null){
            throw new CustomException(ErrorCode.CATEGORY_ALREADY_EXIST);
        }

        Category category = Category.builder()
                .name(categoryRequestDTO.getCategoryName())
                .build();
        category.addBookmarkList(existingBookmarkList);
        category = categoryRepository.save(category);
        return new CategoryParamDTO(category.getId(),category.getName());
    }

    @Override
    public void deleteCategory(Long userId, Long categoryId) throws RuntimeException{
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new CustomException(ErrorCode.CATEGORY_NOT_FOUND));
        if(category.getBookmarklist().getUser().getId() != userId) {
            throw new CustomException(ErrorCode.UNAUTHORIZED_USER);
        }

        categoryRepository.delete(category);
    }

    @Override
    public CategoryParamDTO updateCategory(Long userId, Long categoryId, CategoryRequestDTO categoryRequestDTO) throws RuntimeException {
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new CustomException(ErrorCode.CATEGORY_NOT_FOUND));
        if(category.getBookmarklist().getUser().getId() != userId) {
            throw new CustomException(ErrorCode.UNAUTHORIZED_USER);
        }
        category.updateCategory(categoryRequestDTO);
        category = categoryRepository.save(category);
        return new CategoryParamDTO(category.getId(),category.getName());
    }
}
