package com.ssafy.itclips.category.service;

import com.ssafy.itclips.category.dto.CategoryDTO;

public interface CategoryService {
    void addCategory(Long listId, CategoryDTO categoryDTO) throws RuntimeException;
}
