package com.ssafy.itclips.tag.service;


import com.ssafy.itclips.tag.entity.Tag;
import com.ssafy.itclips.tag.repository.TagRepository;
import jakarta.transaction.Transactional;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeAll;
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

    private static List<Tag> tagList;

    @BeforeAll
    static void addTag() {
        Tag tag1 = Tag.builder()
                .title("java")
                .isOrigin(true)
                .build();
        Tag tag2 = Tag.builder()
                .title("python")
                .isOrigin(false)
                .build();

        tagList = new ArrayList<Tag>();
        tagList.add(tag1);
        tagList.add(tag2);

    }

    @Test
    void saveTags() {
        tagService.saveTags(tagList);
        List<Tag> tags = tagService.getAllTags();
        Assertions.assertThat(tags).hasSize(2);
    }

    @Test
    void getOriginTags() {
        tagService.saveTags(tagList);
        List<Tag> tags = tagService.getOriginTags();
        Assertions.assertThat(tags).hasSize(1);
    }


}