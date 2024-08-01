package com.ssafy.itclips.error;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum ErrorCode {

    USER_NOT_FOUND(HttpStatus.NOT_FOUND,"ACCOUNT-001","사용자를 찾을 수 없습니다."),
    BOOKMARK_LIST_NOT_FOUND(HttpStatus.NOT_FOUND,"BL-001","리스트를 찾을 수 없습니다."),
    LIST_LIKE_ALREADY_EXIST(HttpStatus.BAD_REQUEST,"BL-002","이미 좋아요 한 리스트입니다."),
    LIST_LIKE_NOT_FOUND(HttpStatus.NOT_FOUND,"BL-003","좋아요하지 않은 글입니다."),
    LIST_ALREADY_SCRAPPED(HttpStatus.BAD_REQUEST,"BL-004","이미 스크랩 한 리스트입니다."),
    LIST_NOT_SCRAPPED(HttpStatus.NOT_FOUND,"BL-004","스크랩하지 않은 글입니다."),
    CATEGORY_NOT_FOUND(HttpStatus.NOT_FOUND,"CAT-001","카테고리를 찾을 수 없습니다."),
    BOOKMARK_NOT_FOUND(HttpStatus.NOT_FOUND,"BM-001","북마크를 찾을 수 없습니다."),
    BOOKMARK_LIKE_ALREADY_EXIST(HttpStatus.BAD_REQUEST,"BM-002", "이미 좋아요 한 북마크입니다."),
    BOOKMARK_LIKE_NOT_FOUND(HttpStatus.NOT_FOUND,"BM-003","좋아요하지 않은 북마크입니다"),
    COMMENT_NOT_FOUND(HttpStatus.NOT_FOUND,"CM-001","댓글을 찾을 수 업습니다."),
    ROADMAP_NOT_FOUND(HttpStatus.NOT_FOUND,"RM-001","로드맵을 찾을 수 없습니다."),
    ROADMAP_LIKE_EXIST(HttpStatus.NOT_FOUND,"RLE-001","이미 좋아요한 리스트입니다."),
    ROADMAP_LIKE_NOT_FOUND(HttpStatus.NOT_FOUND,"RLNF-001","좋아요한 리스트가 아닙니다."),
    LIKE_USER_NOT_FOUND(HttpStatus.NOT_FOUND,"LUNF-001","좋아요한 사용자가 없습니다."),
    STEP_NOT_FOUND(HttpStatus.NOT_FOUND,"SNF-001","해당 로드맵 단계를 찾을 수 없습니다."),
    COMMENT_NOT_ALLOWED(HttpStatus.UNAUTHORIZED,"CM-002","댓글에 접근할 권한이 없습니다."),
    REPORT_ALREADY_EXIST(HttpStatus.BAD_REQUEST,"RP-001","이미 신고한 정보입니다"),
    UNAUTHORIZED_USER(HttpStatus.UNAUTHORIZED, "UU-001", "권한이 없습니다."),
    CHAT_NOT_FOUND(HttpStatus.NOT_FOUND,"CNF-001","채팅이 없습니다."),
    CHAT_ROOM_NOT_FOUND(HttpStatus.NOT_FOUND,"CRNF-001","채팅방이 없습니다.");


    private final HttpStatus httpStatus;
    private final String code;
    private final String message;
}
