package com.ssafy.itclips.error;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum ErrorCode {

    USER_NOT_FOUND(HttpStatus.NOT_FOUND,"ACCOUNT-001","사용자를 찾을 수 없습니다."),
    BOOKMARK_LIST_NOT_FOUND(HttpStatus.NOT_FOUND,"BL-001","리스트를 찾을 수 없습니다."),
    LIST_LIKE_ALREADY_EXIST(HttpStatus.BAD_REQUEST,"BL-002","이미 좋아요 한 글입니다"),
    CATEGORY_NOT_FOUND(HttpStatus.NOT_FOUND,"CAT-001","카테고리를 찾을 수 없습니다."),
    BOOKMARK_NOT_FOUND(HttpStatus.NOT_FOUND,"BM-001","북마크를 찾을 수 없습니다."),
    COMMENT_NOT_FOUND(HttpStatus.NOT_FOUND,"CM-001","댓글을 찾을 수 업습니다."),
    COMMENT_NOT_ALLOWED(HttpStatus.UNAUTHORIZED,"CM-002","댓글에 접근할 권한이 없습니다.")
    ;

    private final HttpStatus httpStatus;
    private final String code;
    private final String message;
}
