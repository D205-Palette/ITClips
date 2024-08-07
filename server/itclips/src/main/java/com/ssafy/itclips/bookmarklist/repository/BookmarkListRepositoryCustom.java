package com.ssafy.itclips.bookmarklist.repository;

import com.ssafy.itclips.bookmark.dto.BookmarkDetailDTO;
import com.ssafy.itclips.bookmarklist.entity.BookmarkList;
import com.ssafy.itclips.global.rank.RankDTO;
import com.ssafy.itclips.recommend.dto.SimilarBookmarkResponse;
import com.ssafy.itclips.tag.dto.TagSearchDTO;

import java.util.List;

public interface BookmarkListRepositoryCustom {
    List<BookmarkList> findDetailedByUserId(Long userId);
    List<BookmarkDetailDTO> findDetailedByListId(Long listId);
    List<RankDTO> findListRankingByLike();
    List<RankDTO> findListRankingByScrap();
    List<BookmarkList> findBookmarkListByTitleAndHit(String title, Integer pageNo);
    List<BookmarkList> findBookmarkListByTitleAndScrap(String title, Integer pageNo);
    List<BookmarkList> findBookmarkListByTitleAndLike(String title, Integer pageNo);
    List<BookmarkList> findBookmarkListByTags(TagSearchDTO tagSearchDTO, Integer pageNo);
    List<BookmarkList> findBookmarkListByIds(List<SimilarBookmarkResponse> similarLists);
}
