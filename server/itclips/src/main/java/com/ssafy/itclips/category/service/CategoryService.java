package com.ssafy.itclips.category.service;

import com.ssafy.itclips.category.dto.CategoryRequestDTO;
import com.ssafy.itclips.category.dto.CategoryParamDTO;

public interface CategoryService {
    CategoryParamDTO addCategory(Long listId, CategoryRequestDTO categoryRequestDTO) throws RuntimeException;

    void deleteCategory(Long categoryId) throws RuntimeException;

    CategoryParamDTO updateCategory(Long categoryId, CategoryRequestDTO categoryRequestDTO) throws RuntimeException;
}
