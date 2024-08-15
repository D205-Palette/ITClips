package com.ssafy.itclips.tag.repository;


import com.ssafy.itclips.tag.entity.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

public interface TagRepository extends JpaRepository<Tag, Long> {


    List<Tag> findByIsOrigin(Boolean isOrigin);
    List<Tag> findByTitleIn(List<String> titles);

}
