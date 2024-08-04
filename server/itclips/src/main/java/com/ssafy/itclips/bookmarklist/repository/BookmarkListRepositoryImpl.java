package com.ssafy.itclips.bookmarklist.repository;

import com.querydsl.core.Tuple;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.itclips.bookmark.dto.BookmarkDetailDTO;
import com.ssafy.itclips.bookmark.entity.Bookmark;
import com.ssafy.itclips.bookmark.entity.QBookmark;
import com.ssafy.itclips.bookmarklist.entity.BookmarkList;
import com.ssafy.itclips.bookmarklist.entity.QBookmarkList;
import com.ssafy.itclips.bookmarklist.entity.QBookmarkListLike;
import com.ssafy.itclips.bookmarklist.entity.QBookmarkListScrap;
import com.ssafy.itclips.category.entity.Category;
import com.ssafy.itclips.category.entity.QBookmarkCategory;
import com.ssafy.itclips.category.entity.QCategory;
import com.ssafy.itclips.error.CustomException;
import com.ssafy.itclips.error.ErrorCode;
import com.ssafy.itclips.global.rank.RankDTO;
import com.ssafy.itclips.group.entity.QUserGroup;
import com.ssafy.itclips.tag.dto.TagDTO;
import com.ssafy.itclips.tag.dto.TagSearchDTO;
import com.ssafy.itclips.tag.entity.QBookmarkListTag;
import com.ssafy.itclips.tag.entity.QTag;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Repository
@RequiredArgsConstructor
public class BookmarkListRepositoryImpl implements BookmarkListRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    private static final Integer PAGE_SIZE = 8;

    @Override
    public List<BookmarkList> findDetailedByUserId(Long userId) {
        QBookmarkList bookmarkList = QBookmarkList.bookmarkList;
        QUserGroup userGroup = QUserGroup.userGroup;
        QTag tag = QTag.tag;
        QBookmarkListTag bookmarkListTag = QBookmarkListTag.bookmarkListTag;

        return queryFactory.selectFrom(bookmarkList)
                .leftJoin(bookmarkList.groups, userGroup).fetchJoin()
                .leftJoin(bookmarkList.tags, bookmarkListTag).fetchJoin()
                .leftJoin(bookmarkListTag.tag, tag).fetchJoin()
                .where(bookmarkList.user.id.eq(userId))
                .fetch();
    }

    @Override
    public List<BookmarkList> findBookmarkListByTitleAndHit(String title, Integer pageNo) {
        QBookmarkList qBookmarkList = QBookmarkList.bookmarkList;

        int offset = (pageNo - 1) * PAGE_SIZE;

        return queryFactory.selectFrom(qBookmarkList)
                .where(qBookmarkList.title.contains(title)
                        .and(qBookmarkList.isPublic.isTrue()))
                .orderBy(qBookmarkList.hit.desc(), qBookmarkList.createdAt.desc())
                .offset(offset)
                .limit(PAGE_SIZE)
                .fetch();
    }

    @Override
    public List<BookmarkList> findBookmarkListByTitleAndScrap(String title, Integer pageNo) {
        QBookmarkList qBookmarkList = QBookmarkList.bookmarkList;
        QBookmarkListScrap qBookmarkListScrap = QBookmarkListScrap.bookmarkListScrap;

        int offset = (pageNo - 1) * PAGE_SIZE;

        return queryFactory.select(qBookmarkList)
                .from(qBookmarkList)
                .join(qBookmarkListScrap).on(qBookmarkList.id.eq(qBookmarkListScrap.bookmarkList.id))
                .where(qBookmarkList.title.contains(title)
                        .and(qBookmarkList.isPublic.isTrue()))
                .groupBy(qBookmarkList.id)
                .orderBy(qBookmarkListScrap.id.count().desc(), qBookmarkList.createdAt.desc())
                .offset(offset)
                .limit(PAGE_SIZE)
                .fetch();
    }

    @Override
    public List<BookmarkList> findBookmarkListByTitleAndLike(String title, Integer pageNo) {
        QBookmarkList qBookmarkList = QBookmarkList.bookmarkList;
        QBookmarkListLike qBookmarkListLike = QBookmarkListLike.bookmarkListLike;

        int offset = (pageNo - 1) * PAGE_SIZE;

        return queryFactory.select(qBookmarkList)
                .from(qBookmarkList)
                .join(qBookmarkListLike).on(qBookmarkList.id.eq(qBookmarkListLike.bookmarkList.id))
                .where(qBookmarkList.title.contains(title)
                        .and(qBookmarkList.isPublic.isTrue()))
                .groupBy(qBookmarkList.id)
                .orderBy(qBookmarkListLike.id.count().desc(), qBookmarkList.createdAt.desc())
                .offset(offset)
                .limit(PAGE_SIZE)
                .fetch();
    }

    @Override
    public List<RankDTO> findListRankingByLike() {
        QBookmarkList qBookmarkList = QBookmarkList.bookmarkList;
        QBookmarkListLike qBookmarkListLike = QBookmarkListLike.bookmarkListLike;

        return queryFactory.select(Projections.constructor(RankDTO.class,
                        qBookmarkList.id,
                        qBookmarkList.title,
                        qBookmarkListLike.count().as("count")))
                .from(qBookmarkList)
                .innerJoin(qBookmarkListLike)
                .on(qBookmarkList.id.eq(qBookmarkListLike.bookmarkList.id))
                .groupBy(qBookmarkList.id)
                .orderBy(qBookmarkListLike.count().desc())
                .limit(10)
                .fetch();
    }

    @Override
    public List<RankDTO> findListRankingByScrap() {
        QBookmarkList qBookmarkList = QBookmarkList.bookmarkList;
        QBookmarkListScrap qBookmarkListScrap = QBookmarkListScrap.bookmarkListScrap;


        return queryFactory.select(Projections.constructor(RankDTO.class,
                        qBookmarkList.id,
                        qBookmarkList.title,
                        qBookmarkListScrap.count().as("count")))
                .from(qBookmarkList)
                .innerJoin(qBookmarkListScrap)
                .on(qBookmarkList.id.eq(qBookmarkListScrap.bookmarkList.id))
                .groupBy(qBookmarkList.id)
                .orderBy(qBookmarkListScrap.count().desc())
                .limit(10)
                .fetch();
    }

    @Override
    public List<BookmarkDetailDTO> findDetailedByListId(Long listId) {
        QBookmark qbookmark = QBookmark.bookmark;
        QCategory qcategory = QCategory.category;
        QBookmarkCategory qbookmarkCategory = QBookmarkCategory.bookmarkCategory;

        List<Tuple> results = queryFactory.select(qbookmark,qcategory).
                from(qbookmark)
                .leftJoin(qbookmark.bookmarkCategories,qbookmarkCategory)
                .leftJoin(qbookmarkCategory.category,qcategory)
                .where(qbookmark.bookmarklist.id.eq(listId))
                .fetch();

        if(results == null) {
            throw new CustomException(ErrorCode.BOOKMARK_NOT_FOUND);
        }
        List<BookmarkDetailDTO> bookmarkDetailDTOs = new ArrayList<>();
        for(Tuple tuple : results) {
            Bookmark bookmark = tuple.get(qbookmark);
            Category category = tuple.get(qcategory);
            BookmarkDetailDTO dto = BookmarkDetailDTO.toDTO(bookmark,category);
            bookmarkDetailDTOs.add(dto);
        }

        return bookmarkDetailDTOs;
    }

    @Override
    public List<BookmarkList> findBookmarkListByTags(TagSearchDTO tagSearchDTO, Integer pageNo) {
        QBookmarkList qBookmarkList = QBookmarkList.bookmarkList;
        QBookmarkListTag qBookmarkListTag = QBookmarkListTag.bookmarkListTag;
        QTag qTag = QTag.tag;

        List<TagDTO> tags = tagSearchDTO.getTags();

        List<String> tagTitles = tags.stream()
                .map(TagDTO::getTitle)
                .toList();

        int offset = (pageNo - 1) * PAGE_SIZE;

        return queryFactory.select(qBookmarkList)
                .from(qBookmarkList)
                .join(qBookmarkListTag).on(qBookmarkList.id.eq(qBookmarkListTag.bookmarkList.id))
                .join(qTag).on(qTag.id.eq(qBookmarkListTag.tag.id))
                .where(qTag.title.in(tagTitles))
                .orderBy(qBookmarkList.hit.desc(), qBookmarkList.createdAt.desc())
                .offset(offset)
                .limit(PAGE_SIZE)
                .fetch();
    }
}
