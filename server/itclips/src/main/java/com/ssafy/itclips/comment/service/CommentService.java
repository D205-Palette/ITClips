package com.ssafy.itclips.comment.service;

import com.ssafy.itclips.comment.dto.CommentDTO;

public interface CommentService {


    void createComment(Long userId, Long listId, CommentDTO commentDTO) throws RuntimeException;
}
