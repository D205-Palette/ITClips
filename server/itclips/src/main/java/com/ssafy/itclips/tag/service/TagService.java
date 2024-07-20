package com.ssafy.itclips.tag.service;

import com.ssafy.itclips.tag.entity.Tag;

import java.util.List;

public interface TagService {


    List<Tag> getOriginTags() throws RuntimeException;

    boolean saveTags(List<Tag> tags) throws RuntimeException;

    List<Tag> getAllTags() throws RuntimeException;
}
