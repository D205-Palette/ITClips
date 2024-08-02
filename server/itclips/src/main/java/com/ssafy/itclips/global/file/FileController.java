package com.ssafy.itclips.global.file;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/file")
@RequiredArgsConstructor
@CrossOrigin("*")
@Tag(name = "File Controller", description = "파일 API") // 표시명 및 설명 설정
public class FileController {


    private final FileService fileService;

    @GetMapping("/{url}")
    @Operation(summary = "개인 북마크리스트 찾기", description = "개인 북마크리스트를 찾습니다")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "북마크리스트를 성공적으로 조회했습니다."),
            @ApiResponse(responseCode = "404", description = "사용자를 찾을 수 없습니다."),
            @ApiResponse(responseCode = "500", description = "서버 내부 오류가 발생했습니다.")
    })
    public ResponseEntity<?> getPresignedUrl(@PathVariable String url) {
        DataResponseDto data = DataResponseDto.of(fileService.getPresignedUrl("images",url));

        return new ResponseEntity<DataResponseDto>(data,HttpStatus.CREATED);

    }
}
