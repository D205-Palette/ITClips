package com.ssafy.itclips.tag.service;

import com.ssafy.itclips.tag.dto.TagDTO;
import com.ssafy.itclips.tag.dto.UserTagDTO;
import com.ssafy.itclips.tag.entity.Tag;
import com.ssafy.itclips.tag.repository.TagRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TagServiceImpl implements TagService {

    private final TagRepository tagRepository;

    @Override
    public List<UserTagDTO> getOriginTags() throws RuntimeException {
        return tagRepository.findByIsOrigin(true).stream()
                .map(tag -> UserTagDTO.builder()
                        .id(tag.getId())
                        .title(tag.getTitle())
                        .build())
                .toList();
    }

    @Override
    @Transactional
    public List<Tag> saveTags(List<TagDTO> tags) throws RuntimeException {
        if (tags == null || tags.isEmpty()) {
            return Collections.emptyList(); // tags가 null이거나 비어있으면 빈 리스트 반환
        }
        // 태그 제목을 리스트로 추출하고 첫 글자는 대문자, 나머지는 소문자로 변환
        List<String> titles = tags.stream()
                .map(TagDTO::getTitle)
                .collect(Collectors.toList());
        // 기존 DB에서 제목이 존재하는 태그를 조회
        Set<String> existingTitles = getExistingTitles(titles);
        // 새로운 태그만 추가
        List<Tag> newTags = createNewTags(titles, existingTitles);
        // 새로운 태그를 DB에 저장
        tagRepository.saveAll(newTags);
        return tagRepository.findByTitleIn(titles);
    }

    private List<Tag> createTags(List<String> titles) {
        return titles.stream()
                .map(title -> Tag.builder()
                        .title(title)
                        .isOrigin(false)
                        .build())
                .collect(Collectors.toList());
    }

    private static List<Tag> createNewTags(List<String> titles, Set<String> existingTitles) {
        return titles.stream()
                .filter(title -> !existingTitles.contains(title))
                .map(title -> Tag.builder()
                        .title(title)
                        .isOrigin(false)
                        .build())
                .collect(Collectors.toList());
    }

    private Set<String> getExistingTitles(List<String> titles) {
        List<Tag> existingTags = tagRepository.findByTitleIn(titles);
        return existingTags.stream()
                .map(Tag::getTitle)
                .collect(Collectors.toSet());
    }


    @Override
    public List<UserTagDTO> getAllTags() throws RuntimeException {
        return tagRepository.findAll().stream()
                .map(tag -> UserTagDTO.builder()
                        .id(tag.getId())
                        .title(tag.getTitle())
                        .build())
                .toList();
    }
}
