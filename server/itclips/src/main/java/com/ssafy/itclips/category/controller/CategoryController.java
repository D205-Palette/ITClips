package com.ssafy.itclips.category.controller;

import com.ssafy.itclips.category.dto.CategoryDTO;
import com.ssafy.itclips.category.entity.Category;
import com.ssafy.itclips.category.service.CategoryService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/category")
@RequiredArgsConstructor
@Tag(name = "Category Controller", description = "카테고리 관련 API") // 표시명 및 설명 설정
public class CategoryController {

    private final CategoryService categoryService;



    @PostMapping("/add/{listId}")
    @Operation(summary = "카테고리 추가", description = "주어진 리스트 ID로 카테고리를 추가합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "카테고리가 성공적으로 추가되었습니다."),
            @ApiResponse(responseCode = "404", description = "리스트를 찾을 수 없습니다."),
            @ApiResponse(responseCode = "500", description = "서버 내부 오류가 발생했습니다.")
    })
    public ResponseEntity<?> addCategory(@PathVariable @Parameter(description = "리스트 ID", required = true) Long listId,
                                         @RequestBody @Parameter(description = "카테고리 정보", required = true)CategoryDTO categoryDTO) {

        Category category = categoryService.addCategory(listId,categoryDTO);

        return new ResponseEntity<Category>(category,HttpStatus.CREATED);
    }


    @DeleteMapping("/delete/{categoryId}")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "카테고리가 성공적으로 삭제되었습니다."),
            @ApiResponse(responseCode = "404", description = "카테고리를 찾을 수 없습니다."),
            @ApiResponse(responseCode = "500", description = "서버 내부 오류가 발생했습니다.")
    })
    public ResponseEntity<?> removeCategory(@PathVariable @Parameter(description = "카테고리 ID", required = true) Long categoryId) {
        categoryService.deleteCategory(categoryId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
