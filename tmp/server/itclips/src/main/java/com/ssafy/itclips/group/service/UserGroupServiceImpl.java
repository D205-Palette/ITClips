package com.ssafy.itclips.group.service;

import com.ssafy.itclips.bookmarklist.entity.BookmarkList;
import com.ssafy.itclips.bookmarklist.repository.BookmarkListRepository;
import com.ssafy.itclips.error.CustomException;
import com.ssafy.itclips.error.ErrorCode;
import com.ssafy.itclips.group.dto.UserGroupDTO;
import com.ssafy.itclips.group.entity.UserGroup;
import com.ssafy.itclips.group.repository.GroupRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserGroupServiceImpl implements UserGroupService {

    private final GroupRepository groupRepository;
    private final BookmarkListRepository bookmarkListRepository;

    @Override
    @Transactional
    public List<UserGroupDTO> getUserGroups(Long listId) {
        // 기존 북마크 목록을 조회
        BookmarkList existingBookmarkList = bookmarkListRepository.findById(listId)
                .orElseThrow(() -> new CustomException(ErrorCode.BOOKMARK_LIST_NOT_FOUND));

        return groupRepository.findByBookmarkListId(existingBookmarkList.getId()).stream()
                .map(userGroup -> new UserGroupDTO(userGroup.getUser().getId()))
                .collect(Collectors.toList());
    }

}
