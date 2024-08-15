package com.ssafy.itclips.tag.service;

import com.ssafy.itclips.tag.dto.TagDTO;
import com.ssafy.itclips.tag.dto.UserTagDTO;
import com.ssafy.itclips.tag.entity.Tag;

import java.util.List;

public interface TagService {


    List<UserTagDTO> getOriginTags() throws RuntimeException;

    List<Tag> saveTags(List<TagDTO> tags) throws RuntimeException;

    List<UserTagDTO> getAllTags() throws RuntimeException;
}
