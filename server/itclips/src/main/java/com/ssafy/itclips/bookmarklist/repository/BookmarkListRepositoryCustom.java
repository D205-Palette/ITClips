package com.ssafy.itclips.bookmarklist.repository;

import com.ssafy.itclips.bookmark.dto.BookmarkDetailDTO;
import com.ssafy.itclips.bookmarklist.entity.BookmarkList;
import com.ssafy.itclips.global.rank.RankDTO;

import java.util.List;

public interface BookmarkListRepositoryCustom {
    List<BookmarkList> findDetailedByUserId(Long userId);
    List<BookmarkDetailDTO> findDetailedByListId(Long listId);
    List<RankDTO> findListRankingByLike();
    List<RankDTO> findListRankingByScrap();
}
