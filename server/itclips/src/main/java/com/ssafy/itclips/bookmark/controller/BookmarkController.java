package com.ssafy.itclips.bookmark.controller;

import com.ssafy.itclips.bookmark.dto.BookmarkRequestDTO;
import com.ssafy.itclips.bookmark.service.BookmarkService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/bookmark")
@RequiredArgsConstructor
public class BookmarkController {

    private final BookmarkService bookmarkService;

    @PostMapping("/add/{listId}/{categoryId}")
    public ResponseEntity<?> createBookmark(@PathVariable Long listId,
                                            @PathVariable Long categoryId,
                                            @RequestBody BookmarkRequestDTO bookmarkRequestDTO) {
        bookmarkService.createBookmark(listId,categoryId,bookmarkRequestDTO);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }
}
