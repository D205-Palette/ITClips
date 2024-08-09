package com.ssafy.itclips.bookmarklist.repository;

import com.querydsl.core.Tuple;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.itclips.bookmark.dto.BookmarkDetailDTO;
import com.ssafy.itclips.bookmark.entity.Bookmark;
import com.ssafy.itclips.bookmark.entity.QBookmark;
import com.ssafy.itclips.bookmarklist.dto.BookmarkListAndTagsDTO;
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
import com.ssafy.itclips.recommend.dto.SimilarBookmarkResponse;
import com.ssafy.itclips.tag.dto.TagDTO;
import com.ssafy.itclips.tag.dto.TagSearchDTO;
import com.ssafy.itclips.tag.entity.QBookmarkListTag;
import com.ssafy.itclips.tag.entity.QTag;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
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
                .where(qBookmarkList.isPublic.isTrue())
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
                .where(qBookmarkList.isPublic.isTrue())
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

            if(category == null) {
                category = Category.builder()
                        .name("")
                        .build();
            }
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

    @Override
    public List<BookmarkList> findBookmarkListByIds(List<SimilarBookmarkResponse> similarLists) {
        QBookmarkList qBookmarkList = QBookmarkList.bookmarkList;

        List<Long> ids = similarLists.stream()
                .map(SimilarBookmarkResponse::getBookmarkListId)
                .collect(Collectors.toList());

        return queryFactory.select(qBookmarkList)
                .from(qBookmarkList)
                .where(qBookmarkList.id.in(ids))
                .fetch();
    }

    @Override
    public List<BookmarkListAndTagsDTO> findBookmarkListTitleAndTags(Long userId) {
        QBookmarkList qBookmarkList = QBookmarkList.bookmarkList;
        QUserGroup qUserGroup = QUserGroup.userGroup;
        QBookmarkListTag qBookmarkListTag = QBookmarkListTag.bookmarkListTag;
        QTag qTag = QTag.tag;

        List<Tuple> results = queryFactory
                .select(qBookmarkList.id, qBookmarkList.title, qTag.title)
                .from(qBookmarkList)
                .join(qUserGroup).on(qBookmarkList.id.eq(qUserGroup.bookmarkList.id))
                .leftJoin(qBookmarkListTag).on(qBookmarkList.id.eq(qBookmarkListTag.bookmarkList.id))
                .leftJoin(qTag).on(qBookmarkListTag.tag.id.eq(qTag.id))
                .where(qUserGroup.user.id.eq(userId))
                .fetch();

        Map<Long, BookmarkListAndTagsDTO> bookmarkMap = getBookmarkListAndTagsDTO(results, qBookmarkList, qTag);
        return new ArrayList<>(bookmarkMap.values());
    }

    @Override
    public List<BookmarkListAndTagsDTO> findScrapedBookmarkListTitleAndTags(Long userId) {
        QBookmarkList qBookmarkList = QBookmarkList.bookmarkList;
        QBookmarkListScrap qBookmarkListScrap = QBookmarkListScrap.bookmarkListScrap;
        QBookmarkListTag qBookmarkListTag = QBookmarkListTag.bookmarkListTag;
        QTag qTag = QTag.tag;

        List<Tuple> results = queryFactory
                .select(qBookmarkList.id, qBookmarkList.title, qTag.title)
                .from(qBookmarkList)
                .join(qBookmarkListScrap).on(qBookmarkListScrap.bookmarkList.id.eq(qBookmarkList.id))
                .leftJoin(qBookmarkListTag).on(qBookmarkList.id.eq(qBookmarkListTag.bookmarkList.id))
                .leftJoin(qTag).on(qBookmarkListTag.tag.id.eq(qTag.id))
                .where(qBookmarkListScrap.user.id.eq(userId))
                .fetch();

        Map<Long, BookmarkListAndTagsDTO> bookmarkMap = getBookmarkListAndTagsDTO(results, qBookmarkList, qTag);
        return new ArrayList<>(bookmarkMap.values());

    }

    private static Map<Long, BookmarkListAndTagsDTO> getBookmarkListAndTagsDTO(List<Tuple> results, QBookmarkList qBookmarkList, QTag qTag) {
        Map<Long, BookmarkListAndTagsDTO> bookmarkMap = new HashMap<>();

        for (Tuple tuple : results) {
            Long bookmarkId = tuple.get(qBookmarkList.id);
            String bookmarkTitle = tuple.get(qBookmarkList.title);
            String tagTitle = tuple.get(qTag.title);

            BookmarkListAndTagsDTO dto = bookmarkMap.computeIfAbsent(bookmarkId,
                    id -> new BookmarkListAndTagsDTO(bookmarkId ,bookmarkTitle, new ArrayList<>()));

            if (tagTitle != null) {
                dto.getTags().add(new TagDTO(tagTitle));
            }
        }
        return bookmarkMap;
    }
}
