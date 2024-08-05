package com.ssafy.itclips.comment.service;

import com.ssafy.itclips.alarm.entity.NotificationType;
import com.ssafy.itclips.alarm.repository.NotificationRepository;
import com.ssafy.itclips.alarm.service.NotificationService;
import com.ssafy.itclips.bookmarklist.entity.BookmarkList;
import com.ssafy.itclips.bookmarklist.repository.BookmarkListRepository;
import com.ssafy.itclips.comment.dto.CommentDTO;
import com.ssafy.itclips.comment.dto.CommentResponseDTO;
import com.ssafy.itclips.comment.entity.BookmarkListComment;
import com.ssafy.itclips.comment.repository.CommentRepository;
import com.ssafy.itclips.error.CustomException;
import com.ssafy.itclips.error.ErrorCode;
import com.ssafy.itclips.group.entity.UserGroup;
import com.ssafy.itclips.user.dto.UserTitleDTO;
import com.ssafy.itclips.user.entity.User;
import com.ssafy.itclips.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {

    private final CommentRepository commentRepository;
    private final UserRepository userRepository;
    private final BookmarkListRepository bookmarkListRepository;
    private final NotificationService notificationService;

    @Override
    @Transactional
    public void createComment(Long userId, Long listId, CommentDTO commentDTO) throws RuntimeException {
        User user = userRepository.findById(userId)
                .orElseThrow(()-> new CustomException(ErrorCode.USER_NOT_FOUND));
        BookmarkList existingBookmarkList = bookmarkListRepository.findById(listId)
                .orElseThrow(() -> new CustomException(ErrorCode.BOOKMARK_LIST_NOT_FOUND));

        BookmarkListComment comment = BookmarkListComment.builder()
                .contents(commentDTO.getContents())
                .build();

        comment.addUserAndList(user,existingBookmarkList);
        commentRepository.save(comment);

        //알림 전송
        Set<UserGroup> groups = existingBookmarkList.getGroups();

        for (UserGroup group : groups) {
            Long receiverId = group.getUser().getId();
            String senderNickname = user.getNickname();
            //알림 전송
            notificationService.sendNotification(userId, receiverId,listId,senderNickname, NotificationType.LIST_COMMENT);
        }
    }

    @Override
    @Transactional
    public void deleteComment(Long userId, Long commentId) throws RuntimeException {
        User user = userRepository.findById(userId)
                .orElseThrow(()-> new CustomException(ErrorCode.USER_NOT_FOUND));
        BookmarkListComment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new CustomException(ErrorCode.COMMENT_NOT_FOUND));

        if(comment.getUser().getId() != user.getId()){
            throw new CustomException(ErrorCode.COMMENT_NOT_ALLOWED);
        }

        // 알림 삭제
        Set<UserGroup> groups = comment.getBookmarkList().getGroups();
        for (UserGroup group : groups) {
            Long receiverId = group.getUser().getId();
            notificationService.deleteNotification(userId, receiverId, comment.getBookmarkList().getId(), NotificationType.LIST_COMMENT);
        }

        commentRepository.delete(comment);
    }

    @Override
    @Transactional
    public void updateComment(Long userId, Long commentId, CommentDTO commentDTO) throws RuntimeException {
        User user = userRepository.findById(userId)
                .orElseThrow(()-> new CustomException(ErrorCode.USER_NOT_FOUND));
        BookmarkListComment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new CustomException(ErrorCode.COMMENT_NOT_FOUND));

        if(comment.getUser().getId() != user.getId()){
            throw new CustomException(ErrorCode.COMMENT_NOT_ALLOWED);
        }

        comment.setContents(commentDTO.getContents());
    }

    @Override
    @Transactional
    public List<CommentResponseDTO> getComments(Long listId) throws RuntimeException {
        BookmarkList existingBookmarkList = bookmarkListRepository.findById(listId)
                .orElseThrow(() -> new CustomException(ErrorCode.BOOKMARK_LIST_NOT_FOUND));
        List<BookmarkListComment> comments = commentRepository.findCommentsByListId(existingBookmarkList.getId());

        return comments.stream()
                .map(this::convertToCommentResponseDTO)
                .collect(Collectors.toList());
    }

    private CommentResponseDTO convertToCommentResponseDTO(BookmarkListComment comment) {
        return CommentResponseDTO.builder()
                .commentId(comment.getId())
                .commentUser(convertToUserTitleDTO(comment.getUser()))
                .comment(comment.getContents())
                .commentTime(comment.getCreatedAt())
                .build();
    }

    private UserTitleDTO convertToUserTitleDTO(User user) {
        return UserTitleDTO.builder()
                .id(user.getId())
                .nickName(user.getNickname())
                .build();
    }
}
