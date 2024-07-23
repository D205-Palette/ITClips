package com.ssafy.itclips.comment.service;

import com.ssafy.itclips.comment.dto.CommentDTO;

public interface CommentService {


    void createComment(Long userId, Long listId, CommentDTO commentDTO) throws RuntimeException;

    void deleteComment(Long userId, Long commentId) throws RuntimeException;

    void updateComment(Long userId, Long commentId, CommentDTO commentDTO) throws RuntimeException;
}
