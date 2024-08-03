package com.ssafy.itclips.error;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum ErrorCode {

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
    CHAT_ROOM_NOT_FOUND(HttpStatus.NOT_FOUND,"CRNF-001","채팅방이 없습니다."),


    // User
    USER_NOT_FOUND(HttpStatus.NOT_FOUND, "ACCOUNT-001", "사용자를 찾을 수 없습니다."),
    USER_UPDATE_FAIL(HttpStatus.INTERNAL_SERVER_ERROR, "ACCOUNT-002", "회원 정보 수정에 실패했습니다."),
    USER_DELETE_FAIL(HttpStatus.INTERNAL_SERVER_ERROR, "ACCOUNT-003", "회원 탈퇴에 실패했습니다."),
    EMAIL_NOT_FOUND(HttpStatus.NOT_FOUND, "ACCOUNT-004", "이메일을 찾을 수 없습니다."),
    INVALID_AUTH_CODE(HttpStatus.BAD_REQUEST, "ACCOUNT-005", "잘못된 인증 코드입니다."),
    EMAIL_ALREADY_EXISTS(HttpStatus.CONFLICT, "ACCOUNT-006", "이메일이 중복되었습니다."),
    NICKNAME_ALREADY_EXISTS(HttpStatus.CONFLICT, "ACCOUNT-007", "닉네임이 중복되었습니다."),
    REFRESH_TOKEN_INVALID(HttpStatus.BAD_REQUEST, "ACCOUNT-008", "유효하지 않은 리프레시 토큰입니다."),
    USER_TAG_NOT_FOUND(HttpStatus.NOT_FOUND, "ACCOUNT-009", "관심사 태그가 존재하지 않습니다."),
    USER_TAG_ALREADY_EXISTS(HttpStatus.BAD_REQUEST, "ACCOUNT-010", "이미 존재하는 관심사입니다."),
    PASSWORD_RESET_FAIL(HttpStatus.INTERNAL_SERVER_ERROR, "ACCOUNT-011", "임시 비밀번호 발송 중 오류가 발생했습니다."),
    PASSWORD_CHANGE_FAIL(HttpStatus.BAD_REQUEST, "ACCOUNT-012", "기존 비밀번호가 일치하지 않습니다."),
    USER_NOT_AUTHENTICATED(HttpStatus.UNAUTHORIZED, "ACCOUNT-013", "인증되지 않은 사용자입니다."),
    FILE_UPLOAD_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "ACCOUNT-014", "파일 업로드 중 오류가 발생했습니다."),
    EMAIL_SEND_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "ACCOUNT-015", "이메일 발송 중 오류가 발생했습니다."),

    // Follow
    FOLLOW_ALREADY_EXISTS(HttpStatus.BAD_REQUEST, "FOLLOW-001", "이미 팔로우 중인 사용자입니다."),
    FOLLOW_NOT_FOUND(HttpStatus.NOT_FOUND, "FOLLOW-002", "팔로우 관계를 찾을 수 없습니다."),
    UNFOLLOW_NOT_FOUND(HttpStatus.NOT_FOUND, "UNFOLLOW-001", "언팔로우할 팔로우 관계를 찾을 수 없습니다."),
    INVALID_FOLLOW_REQUEST(HttpStatus.BAD_REQUEST, "FOLLOW-003", "잘못된 팔로우 요청입니다."),

    //feed
    FEED_NOT_FOUND(HttpStatus.NOT_FOUND, "FNF-001","피드가 없습니다.")
    ;

    private final HttpStatus httpStatus;
    private final String code;
    private final String message;
}
