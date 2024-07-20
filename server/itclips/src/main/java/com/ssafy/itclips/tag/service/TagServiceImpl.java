package com.ssafy.itclips.tag.service;

import com.ssafy.itclips.tag.entity.Tag;
import com.ssafy.itclips.tag.repository.TagRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TagServiceImpl implements TagService {

    private final TagRepository tagRepository;

    @Override
    public List<Tag> getOriginTags() throws RuntimeException {
        return tagRepository.findByIsOrigin(true);
    }

    @Override
    @Transactional
    public boolean saveTags(List<Tag> tags) throws RuntimeException {
        return tagRepository.saveAll(tags).size() == tags.size();
    }

    @Override
    public List<Tag> getAllTags() throws RuntimeException {
        return tagRepository.findAll();
    }
}
