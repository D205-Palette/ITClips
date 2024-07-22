package com.ssafy.itclips.category.service;

import com.ssafy.itclips.category.dto.CategoryRequestDTO;
import com.ssafy.itclips.category.dto.CategoryResponseDTO;
import com.ssafy.itclips.category.entity.Category;

public interface CategoryService {
    CategoryResponseDTO addCategory(Long listId, CategoryRequestDTO categoryRequestDTO) throws RuntimeException;

    void deleteCategory(Long categoryId) throws RuntimeException;
}
