package com.ssafy.itclips.category.service;

import com.ssafy.itclips.category.dto.CategoryDTO;
import com.ssafy.itclips.category.entity.Category;

public interface CategoryService {
    Category addCategory(Long listId, CategoryDTO categoryDTO) throws RuntimeException;

    void deleteCategory(Long categoryId) throws RuntimeException;
}
