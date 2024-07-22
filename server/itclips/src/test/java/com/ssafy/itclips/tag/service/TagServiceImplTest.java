package com.ssafy.itclips.tag.service;


import com.ssafy.itclips.tag.dto.TagDTO;
import com.ssafy.itclips.tag.entity.Tag;
import com.ssafy.itclips.tag.repository.TagRepository;
import jakarta.transaction.Transactional;
import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.List;


@SpringBootTest
@Transactional
class TagServiceImplTest {

    @Autowired
    private TagService tagService;

    @Autowired
    private TagRepository tagRepository;

    @DisplayName("태그 추가 확인")
    @Test
    void saveTags() {
        List<TagDTO> tagList = new ArrayList<>();
        tagList.add(new TagDTO("java"));
        tagList.add(new TagDTO("python"));
        tagService.saveTags(tagList);
        List<Tag> savedTagsFromDb = tagRepository.findByTitleIn(List.of("Java", "Python"));
        assertThat(savedTagsFromDb).hasSize(2);
    }

    @DisplayName("기본 태그 확인")
    @Test
    void getOriginTags() {
        Tag tag = Tag.builder()
                .title("java")
                .isOrigin(true)
                .build();
        tagRepository.save(tag);
        List<Tag> tags = tagService.getOriginTags();
        assertThat(tags).isNotEmpty(); // 태그가 비어있지 않은지 확인
        assertThat(tags).allMatch(Tag::getIsOrigin); // 모든 태그의 isOrigin이 true인지 확인
    }


}