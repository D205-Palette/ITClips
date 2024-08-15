package com.ssafy.itclips.bookmarklist.repository;

import com.ssafy.itclips.bookmark.dto.BookmarkDetailDTO;
import com.ssafy.itclips.bookmarklist.dto.BookmarkListAndTagsDTO;
import com.ssafy.itclips.bookmarklist.entity.BookmarkList;
import com.ssafy.itclips.global.rank.RankDTO;
import com.ssafy.itclips.recommend.dto.SimilarBookmarkResponse;
import com.ssafy.itclips.tag.dto.TagSearchDTO;
import com.ssafy.itclips.user.entity.User;

import java.util.List;
import java.util.Set;

public interface BookmarkListRepositoryCustom {
    List<BookmarkList> findBookmarkListByUserId(Long userId);
    List<BookmarkDetailDTO> findDetailedByListId(Long listId);
    List<RankDTO> findListRankingByLike();
    List<RankDTO> findListRankingByScrap();
    List<BookmarkList> findBookmarkListByTitleAndHit(String title, Integer pageNo);
    List<BookmarkList> findBookmarkListByTitleAndScrap(String title, Integer pageNo);
    List<BookmarkList> findBookmarkListByTitleAndLike(String title, Integer pageNo);
    List<BookmarkList> findBookmarkListByTags(TagSearchDTO tagSearchDTO, Integer pageNo);
    List<BookmarkList> findBookmarkListByIds(List<SimilarBookmarkResponse> similarLists);
    List<BookmarkListAndTagsDTO> findBookmarkListTitleAndTags(Long userId);
    List<BookmarkListAndTagsDTO> findScrapedBookmarkListTitleAndTags(Long userId);
    Set<Long> findGroupUserByListId(Long listId);
}
