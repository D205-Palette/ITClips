package com.ssafy.itclips.category.service;

import com.ssafy.itclips.category.dto.CategoryRequestDTO;
import com.ssafy.itclips.category.dto.CategoryParamDTO;

public interface CategoryService {
    CategoryParamDTO addCategory(Long userId, Long listId, CategoryRequestDTO categoryRequestDTO) throws RuntimeException;

    void deleteCategory(Long userId, Long categoryId) throws RuntimeException;

    CategoryParamDTO updateCategory(Long userId, Long categoryId, CategoryRequestDTO categoryRequestDTO) throws RuntimeException;
}
