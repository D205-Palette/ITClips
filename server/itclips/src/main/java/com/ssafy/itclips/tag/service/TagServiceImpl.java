package com.ssafy.itclips.tag.service;

import com.ssafy.itclips.tag.dto.TagDTO;
import com.ssafy.itclips.tag.entity.Tag;
import com.ssafy.itclips.tag.repository.TagRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

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
    public boolean saveTags(List<TagDTO> tags) throws RuntimeException {
        // 태그 제목을 리스트로 추출하고 첫 글자는 대문자, 나머지는 소문자로 변환
        List<String> titles = tags.stream()
                .map(dto -> capitalizeFirstLetter(dto.getTitle()))
                .collect(Collectors.toList());

        // 기존 DB에서 제목이 존재하는 태그를 조회
        Set<String> existingTitles = getExistingTitles(titles);

        // 새로운 태그만 추가
        List<Tag> newTags = createTags(titles, existingTitles);

        // 새로운 태그를 DB에 저장
        return tagRepository.saveAll(newTags).size() == newTags.size();
    }

    private static List<Tag> createTags(List<String> titles, Set<String> existingTitles) {
        List<Tag> newTags = titles.stream()
                .filter(title -> !existingTitles.contains(title))
                .map(title -> Tag.builder()
                        .title(title)
                        .isOrigin(false)
                        .build())
                .collect(Collectors.toList());
        return newTags;
    }

    private Set<String> getExistingTitles(List<String> titles) {
        List<Tag> existingTags = tagRepository.findByTitleIn(titles);
        Set<String> existingTitles = existingTags.stream()
                .map(Tag::getTitle)
                .collect(Collectors.toSet());
        return existingTitles;
    }

    // 첫 글자를 대문자로, 나머지는 소문자로 변환하는 메소드
    private String capitalizeFirstLetter(String title) {
        if (title == null || title.isEmpty()) {
            return title; // null 또는 빈 문자열인 경우 그대로 반환
        }
        return title.substring(0, 1).toUpperCase() + title.substring(1).toLowerCase();
    }


    @Override
    public List<Tag> getAllTags() throws RuntimeException {
        return tagRepository.findAll();
    }
}
