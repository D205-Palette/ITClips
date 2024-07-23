package com.ssafy.itclips.comment.service;

import com.ssafy.itclips.comment.dto.CommentDTO;
import com.ssafy.itclips.comment.dto.CommentResponseDTO;

import java.util.List;

public interface CommentService {


    void createComment(Long userId, Long listId, CommentDTO commentDTO) throws RuntimeException;

    void deleteComment(Long userId, Long commentId) throws RuntimeException;

    void updateComment(Long userId, Long commentId, CommentDTO commentDTO) throws RuntimeException;

    List<CommentResponseDTO> getComments(Long listId) throws RuntimeException;
}
