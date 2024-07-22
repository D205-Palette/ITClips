package com.ssafy.itclips.group.service;

import com.ssafy.itclips.group.dto.UserGroupDTO;

import java.util.List;

public interface UserGroupService {

    List<UserGroupDTO> getUserGroups(Long listId) throws RuntimeException;
}
