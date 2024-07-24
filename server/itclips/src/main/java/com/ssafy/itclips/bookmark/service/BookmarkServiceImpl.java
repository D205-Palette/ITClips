package com.ssafy.itclips.bookmark.service;

import com.ssafy.itclips.bookmark.dto.BookmarkRequestDTO;
import com.ssafy.itclips.bookmark.dto.BookmarkUpdateDTO;
import com.ssafy.itclips.bookmark.entity.Bookmark;
import com.ssafy.itclips.bookmark.entity.BookmarkLike;
import com.ssafy.itclips.bookmark.repository.BookmarkLikeRepository;
import com.ssafy.itclips.category.entity.BookmarkCategory;
import com.ssafy.itclips.category.repository.BookmarkCategoryRepository;
import com.ssafy.itclips.bookmark.repository.BookmarkRepository;
import com.ssafy.itclips.bookmarklist.entity.BookmarkList;
import com.ssafy.itclips.bookmarklist.repository.BookmarkListRepository;
import com.ssafy.itclips.category.entity.Category;
import com.ssafy.itclips.category.repository.CategoryRepository;
import com.ssafy.itclips.error.CustomException;
import com.ssafy.itclips.error.ErrorCode;
import com.ssafy.itclips.tag.entity.BookmarkTag;
import com.ssafy.itclips.tag.entity.Tag;
import com.ssafy.itclips.tag.repository.BookmarkTagRepository;
import com.ssafy.itclips.tag.service.TagService;
import com.ssafy.itclips.user.entity.User;
import com.ssafy.itclips.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BookmarkServiceImpl implements BookmarkService {

    private final BookmarkRepository bookmarkRepository;
    private final UserRepository userRepository;
    private final BookmarkLikeRepository bookmarkLikeRepository;
    private final TagService tagService;
    private final BookmarkListRepository bookmarkListRepository;
    private final CategoryRepository categoryRepository;
    private final BookmarkCategoryRepository bookmarkCategoryRepository;
    private final BookmarkTagRepository bookmarkTagRepository;

    @Override
    @Transactional
    public void createBookmark(Long listId, Long categoryId, BookmarkRequestDTO bookmarkRequestDTO) throws RuntimeException {
        BookmarkList existingBookmarkList = bookmarkListRepository.findById(listId)
                .orElseThrow(() -> new CustomException(ErrorCode.BOOKMARK_LIST_NOT_FOUND));
        Category existingCategory = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new CustomException(ErrorCode.CATEGORY_NOT_FOUND));
        Integer count = bookmarkCategoryRepository.countByCategoryId(categoryId);
        Bookmark bookmark = buildBookmark(bookmarkRequestDTO, count);
        bookmark.addBookmarkList(existingBookmarkList);
        bookmarkRepository.save(bookmark);

        BookmarkCategory bookmarkCategory = new BookmarkCategory();
        bookmarkCategory.addBookmarkCategory(bookmark,existingCategory);
        bookmarkCategoryRepository.save(bookmarkCategory);

        saveBookmarkTags(bookmarkRequestDTO, bookmark);
    }

    @Override
    @Transactional
    public void updateBookmark(Long bookmarkId, BookmarkRequestDTO bookmarkRequestDTO) throws RuntimeException {
        Bookmark bookmark = bookmarkRepository.findById(bookmarkId)
                .orElseThrow(() -> new CustomException(ErrorCode.BOOKMARK_NOT_FOUND));
        bookmark.updateBookmark(bookmarkRequestDTO);

        bookmarkRepository.save(bookmark);
        bookmarkTagRepository.deleteAllByBookmark(bookmark);

        saveBookmarkTags(bookmarkRequestDTO, bookmark);
    }

    @Transactional
    public void saveBookmarkTags(BookmarkRequestDTO bookmarkRequestDTO, Bookmark bookmark) {
        List<BookmarkTag> bookmarkTags = new ArrayList<>();
        createTags(bookmarkRequestDTO, bookmark, bookmarkTags);
        bookmarkTagRepository.saveAll(bookmarkTags);
    }

    @Override
    @Transactional
    public void deleteBookmark(Long bookmarkId) throws RuntimeException {
        Bookmark bookmark = bookmarkRepository.findById(bookmarkId)
                .orElseThrow(() -> new CustomException(ErrorCode.BOOKMARK_NOT_FOUND));
        bookmarkRepository.deleteById(bookmarkId);
    }

    @Override
    public void likeBookmark(Long userId, Long bookmarkId) throws RuntimeException {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
        Bookmark bookmark = bookmarkRepository.findById(bookmarkId)
                .orElseThrow(() -> new CustomException(ErrorCode.BOOKMARK_NOT_FOUND));
        BookmarkLike bookmarkLike = new BookmarkLike();
        bookmarkLike.addUserAndBookmark(user,bookmark);
        bookmarkLikeRepository.save(bookmarkLike);
    }


    private void createTags(BookmarkRequestDTO bookmarkRequestDTO, Bookmark bookmark, List<BookmarkTag> bookmarkTags) {
        List<Tag> tags = tagService.saveTags(bookmarkRequestDTO.getTags());
        tags.forEach(tag -> {
            BookmarkTag bookmarkTag = new BookmarkTag();
            bookmarkTag.addBookmarkTag(tag, bookmark);
            bookmarkTags.add(bookmarkTag);
        });
    }

    private static Bookmark buildBookmark(BookmarkRequestDTO bookmarkRequestDTO, Integer count) {
        return Bookmark.builder()
                .title(bookmarkRequestDTO.getTitle())
                .url(bookmarkRequestDTO.getUrl())
                .order(count + 1)
                .description(bookmarkRequestDTO.getContent())
                .isReported(false)
                .build();
    }
}
