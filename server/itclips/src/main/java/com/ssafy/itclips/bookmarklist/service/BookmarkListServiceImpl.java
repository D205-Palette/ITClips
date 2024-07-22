package com.ssafy.itclips.bookmarklist.service;

import com.ssafy.itclips.bookmarklist.dto.BookmarkListDTO;
import com.ssafy.itclips.bookmarklist.entity.BookmarkList;
import com.ssafy.itclips.bookmarklist.repository.BookmarkListRepository;
import com.ssafy.itclips.category.entity.Category;
import com.ssafy.itclips.category.repository.CategoryRepository;
import com.ssafy.itclips.error.CustomException;
import com.ssafy.itclips.error.ErrorCode;
import com.ssafy.itclips.group.entity.UserGroup;
import com.ssafy.itclips.group.repository.GroupRepository;
import com.ssafy.itclips.tag.dto.TagDTO;
import com.ssafy.itclips.tag.entity.BookmarkListTag;
import com.ssafy.itclips.tag.entity.Tag;
import com.ssafy.itclips.tag.repository.BookmarkListTagRepository;
import com.ssafy.itclips.tag.service.TagService;
import com.ssafy.itclips.user.entity.User;
import com.ssafy.itclips.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class BookmarkListServiceImpl implements BookmarkListService {

    private final BookmarkListRepository bookmarkListRepository;
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;
    private final GroupRepository groupRepository;
    private final BookmarkListTagRepository bookmarkListTagRepository;
    private final TagService tagService;

    @Override
    @Transactional
    public void createBookmarkList(Long userId, BookmarkListDTO bookmarkListDTO) throws RuntimeException {
        User user = userRepository.findById(userId)
                .orElseThrow(()-> new CustomException(ErrorCode.USER_NOT_FOUND));

        List<Tag> tags = createNewTags(bookmarkListDTO.getTags());
        List<Category> categories =createNewCategories(bookmarkListDTO.getCategories());
        BookmarkList bookmarkList = createNewBookmarkList(bookmarkListDTO, user);
        List<UserGroup> groups = new ArrayList<>();
        List<BookmarkListTag> bookmarkListTags = new ArrayList<>();
        List<User> groupUsers = getGroupUsers(bookmarkListDTO.getUsers());
        setRelations(groupUsers, bookmarkList, groups, tags, bookmarkListTags, categories);
        user.addBookmarkList(bookmarkList);
        bookmarkListRepository.save(bookmarkList);
        categoryRepository.saveAll(categories);
        groupRepository.saveAll(groups);
        bookmarkListTagRepository.saveAll(bookmarkListTags);
    }

    @Override
    @Transactional
    public void updateBookmarkList(Long userId, Long listId, BookmarkListDTO bookmarkListDTO) throws RuntimeException{
        // 기존 북마크 목록을 조회
        BookmarkList existingBookmarkList = bookmarkListRepository.findById(listId)
                .orElseThrow(() -> new CustomException(ErrorCode.BOOKMARK_LIST_NOT_FOUND));
        // 업데이트할 내용 설정
        existingBookmarkList.updateBookmarkList(bookmarkListDTO);
        // 기존 태그, 카테고리, 그룹 삭제
        deleteRelations(userId, existingBookmarkList);
        // 새로운 태그 및 카테고리 생성
        List<Tag> tags = createNewTags(bookmarkListDTO.getTags());
        List<Category> categories = createNewCategories(bookmarkListDTO.getCategories());
        List<User> groupUsers = getGroupUsers(bookmarkListDTO.getUsers());
        // 사용자 그룹 업데이트
        List<UserGroup> groups = new ArrayList<>();
        List<BookmarkListTag> bookmarkListTags = new ArrayList<>();
        setRelations(groupUsers,existingBookmarkList,groups,tags,bookmarkListTags,categories);
        // 저장
        bookmarkListRepository.save(existingBookmarkList);
        categoryRepository.saveAll(categories);
        groupRepository.saveAll(groups);
        bookmarkListTagRepository.saveAll(bookmarkListTags);
    }

    @Override
    @Transactional
    public void deleteBookmarkList(Long userId, Long listId) throws RuntimeException{
        BookmarkList bookmarkList = bookmarkListRepository.findById(listId)
                .orElseThrow(() -> new CustomException(ErrorCode.BOOKMARK_LIST_NOT_FOUND));

        List<BookmarkListTag> bookmarkListTags = bookmarkListTagRepository.findByBookmarkListId(bookmarkList.getId());
        bookmarkListTagRepository.deleteAll(bookmarkListTags);

        // 기존 카테고리 삭제
        List<Category> categories = categoryRepository.findAllByBookmarklist(bookmarkList);
        categoryRepository.deleteAll(categories);

        // 기존 사용자 그룹 삭제
        List<UserGroup> userGroups = groupRepository.findByBookmarkListId(bookmarkList.getId());
        groupRepository.deleteAll(userGroups);

        // 3. 북마크 리스트 삭제
        bookmarkListRepository.delete(bookmarkList);
    }


    @Transactional
    public void deleteRelations(Long userId, BookmarkList existingBookmarkList) throws RuntimeException{
        bookmarkListTagRepository.deleteAllByBookmarklList(existingBookmarkList);
        categoryRepository.deleteAllByBookmarklList(existingBookmarkList);
        groupRepository.deleteByBookmarkListAndUserIdNot(existingBookmarkList, userId);
    }

    private static void setRelations(List<User> groupUsers, BookmarkList bookmarkList, List<UserGroup> groups, List<Tag> tags, List<BookmarkListTag> bookmarkListTags, List<Category> categories) {
        groupUsers.forEach(groupUser -> {
            UserGroup group = new UserGroup();
            groupUser.setGroups(bookmarkList, group);
            groups.add(group);
        });
        tags.forEach(tag -> {
            BookmarkListTag listTag = new BookmarkListTag();
            listTag.setBookmarkListTag(bookmarkList,tag);
            log.info(listTag.getTag().getTitle());
            bookmarkListTags.add(listTag);
        });
        categories.forEach(bookmarkList::addCategory);
    }

    private List<Tag> createNewTags(List<TagDTO> newTags) {
        List<Tag> tags = new ArrayList<>();
        if(newTags != null && !newTags.isEmpty()) {
            tags = tagService.saveTags(newTags);
        }
        return tags;
    }


    private List<User> getGroupUsers(List<String> emails) {
        return Optional.ofNullable(emails)
                .filter(e -> !e.isEmpty())
                .map(userRepository::findByEmails)
                .orElseGet(ArrayList::new);
    }

    private List<Category> createNewCategories(List<String> categoryNames) {
        return (categoryNames != null && !categoryNames.isEmpty())
                ? categoryNames.stream()
                .map(name -> Category.builder().name(name).build())
                .collect(Collectors.toList())
                : Collections.singletonList(Category.builder().name("Undefined").build());
    }

    public BookmarkList createNewBookmarkList(BookmarkListDTO bookmarkListDTO, User user) {
        return BookmarkList.builder()
                .user(user)
                .title(bookmarkListDTO.getTitle())
                .image(bookmarkListDTO.getImage())
                .description(bookmarkListDTO.getDescription())
                .isPublic(bookmarkListDTO.getIsPublic())
                .build();
    }


}
