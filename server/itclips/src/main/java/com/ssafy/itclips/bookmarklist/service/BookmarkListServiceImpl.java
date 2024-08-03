package com.ssafy.itclips.bookmarklist.service;

import com.ssafy.itclips.bookmark.dto.BookmarkDetailDTO;
import com.ssafy.itclips.bookmark.entity.Bookmark;
import com.ssafy.itclips.bookmark.repository.BookmarkLikeRepository;
import com.ssafy.itclips.bookmark.repository.BookmarkRepository;
import com.ssafy.itclips.bookmarklist.dto.BookmarkListDTO;
import com.ssafy.itclips.bookmarklist.dto.BookmarkListDetailDTO;
import com.ssafy.itclips.bookmarklist.dto.BookmarkListResponseDTO;
import com.ssafy.itclips.bookmarklist.dto.BookmarkListRoadmapDTO;
import com.ssafy.itclips.bookmarklist.entity.BookmarkList;
import com.ssafy.itclips.bookmarklist.entity.BookmarkListLike;
import com.ssafy.itclips.bookmarklist.entity.BookmarkListScrap;
import com.ssafy.itclips.bookmarklist.repository.BookmarkListLikeRepository;
import com.ssafy.itclips.bookmarklist.repository.BookmarkListRepository;
import com.ssafy.itclips.bookmarklist.repository.BookmarkListScrapRepository;
import com.ssafy.itclips.category.dto.CategoryParamDTO;
import com.ssafy.itclips.category.entity.Category;
import com.ssafy.itclips.category.repository.CategoryRepository;
import com.ssafy.itclips.error.CustomException;
import com.ssafy.itclips.error.ErrorCode;
import com.ssafy.itclips.global.file.DataResponseDto;
import com.ssafy.itclips.global.file.FileService;
import com.ssafy.itclips.group.entity.UserGroup;
import com.ssafy.itclips.group.repository.GroupRepository;
import com.ssafy.itclips.tag.dto.TagDTO;
import com.ssafy.itclips.tag.entity.BookmarkListTag;
import com.ssafy.itclips.tag.entity.Tag;
import com.ssafy.itclips.tag.repository.BookmarkListTagRepository;
import com.ssafy.itclips.tag.service.TagService;
import com.ssafy.itclips.user.dto.UserTitleDTO;
import com.ssafy.itclips.user.entity.User;
import com.ssafy.itclips.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class BookmarkListServiceImpl implements BookmarkListService {

    private final BookmarkListRepository bookmarkListRepository;
    private final BookmarkRepository bookmarkRepository;
    private final BookmarkLikeRepository bookmarkLikeRepository;
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;
    private final GroupRepository groupRepository;
    private final BookmarkListTagRepository bookmarkListTagRepository;
    private final BookmarkListLikeRepository bookmarkListLikeRepository;
    private final BookmarkListScrapRepository bookmarkListScrapRepository;
    private final TagService tagService;
    private final FileService fileService;

    private final static Integer USER_NUM = 1;

    @Override
    @Transactional
    public DataResponseDto createBookmarkList(Long userId, BookmarkListDTO bookmarkListDTO) throws RuntimeException {
        User user = userRepository.findById(userId)
                .orElseThrow(()-> new CustomException(ErrorCode.USER_NOT_FOUND));
        DataResponseDto imageInfo = DataResponseDto.of(fileService.getPresignedUrl("images",bookmarkListDTO.getImage(),true));
        bookmarkListDTO.setImageToS3FileName(imageInfo.getImage());

        List<Tag> tags = tagService.saveTags(bookmarkListDTO.getTags());
        List<Category> categories =createNewCategories(bookmarkListDTO.getCategories());
        BookmarkList bookmarkList = createNewBookmarkList(bookmarkListDTO, user);
        List<UserGroup> groups = new ArrayList<>();
        List<BookmarkListTag> bookmarkListTags = new ArrayList<>();
        List<User> groupUsers = getGroupUsers(bookmarkListDTO.getUsers());
        groupUsers.add(user);
        setRelations(groupUsers, bookmarkList, groups, tags, bookmarkListTags, categories);
        user.addBookmarkList(bookmarkList);
        bookmarkListRepository.save(bookmarkList);
        categoryRepository.saveAll(categories);
        groupRepository.saveAll(groups);
        bookmarkListTagRepository.saveAll(bookmarkListTags);

        return imageInfo;
    }

    @Override
    @Transactional
    public DataResponseDto updateBookmarkList(Long userId, Long listId, BookmarkListDTO bookmarkListDTO) throws RuntimeException{
        // 기존 북마크 리스트 목록을 조회
        BookmarkList existingBookmarkList = bookmarkListRepository.findById(listId)
                .orElseThrow(() -> new CustomException(ErrorCode.BOOKMARK_LIST_NOT_FOUND));
        // 업데이트할 내용 설정
        DataResponseDto imageInfo = DataResponseDto.of(fileService.getPresignedUrl("images",bookmarkListDTO.getImage(),true));
        bookmarkListDTO.setImageToS3FileName(imageInfo.getImage());
        existingBookmarkList.updateBookmarkList(bookmarkListDTO);
        // 기존 태그, 카테고리, 그룹 삭제
        deleteRelations(userId, existingBookmarkList);
        // 새로운 태그 및 카테고리 생성
        List<Tag> tags = tagService.saveTags(bookmarkListDTO.getTags());
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
        return imageInfo;
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

    @Override
    public List<BookmarkListResponseDTO> getScrapedLists(Long userId) throws RuntimeException {
        List<BookmarkListScrap> bookmarkListScraps = bookmarkListScrapRepository.findByUserId(userId);
        List<BookmarkList> bookmarkLists = getList(bookmarkListScraps);

        if (bookmarkLists.isEmpty()) {
            throw new CustomException(ErrorCode.BOOKMARK_LIST_NOT_FOUND);
        }

        return bookmarkLists.stream()
                .map(bookmarkList -> convertToBookmarkListResponseDTO(bookmarkList, userId)) // userId를 추가로 전달
                .collect(Collectors.toList());
    }

    @Override
    public BookmarkListDetailDTO getListDetail(Long userId, Long listId) throws RuntimeException {
        BookmarkList bookmarkList = bookmarkListRepository.findById(listId)
                .orElseThrow(() -> new CustomException(ErrorCode.BOOKMARK_LIST_NOT_FOUND));

        return convertToBookmarkListDetailDTO(bookmarkList, userId);
    }

    private static List<BookmarkList> getList(List<BookmarkListScrap> bookmarkListScraps) {
        return bookmarkListScraps.stream()
                .map(BookmarkListScrap::getBookmarkList)
                .toList();
    }

    @Override
    @Transactional
    public List<BookmarkListResponseDTO> getLists(Long userId, Boolean target) throws RuntimeException {
        List<BookmarkList> bookmarkLists = bookmarkListRepository.findDetailedByUserId(userId);

        if (bookmarkLists.isEmpty()) {
            throw new CustomException(ErrorCode.BOOKMARK_LIST_NOT_FOUND);
        }

        return bookmarkLists.stream()
                .map(bookmarkList -> convertToBookmarkListResponseDTO(bookmarkList, userId)) // userId를 추가로 전달
                .filter(dto -> (target ? dto.getUsers().size() > USER_NUM : dto.getUsers().size() == USER_NUM))
                .collect(Collectors.toList());
    }

    @Override
    public void createBookmarkListLike(Long userId, Long listId) throws RuntimeException {
        User user = userRepository.findById(userId)
                .orElseThrow(()-> new CustomException(ErrorCode.USER_NOT_FOUND));
        BookmarkList bookmarkList = bookmarkListRepository.findById(listId)
                .orElseThrow(() -> new CustomException(ErrorCode.BOOKMARK_LIST_NOT_FOUND));
        BookmarkListLike existBookmarkListLike = bookmarkListLikeRepository.findByBookmarkListIdAndUserId(listId,userId);
        if (existBookmarkListLike != null) {
            throw new CustomException(ErrorCode.LIST_LIKE_ALREADY_EXIST);
        }
        BookmarkListLike bookmarkListLike = new BookmarkListLike();
        bookmarkListLike.addUserAndBookmarkList(user,bookmarkList);
        bookmarkListLikeRepository.save(bookmarkListLike);
    }

    @Override
    @Transactional
    public void deleteBookmarkListLike(Long userId, Long listId) throws RuntimeException{
        User user = userRepository.findById(userId)
                .orElseThrow(()-> new CustomException(ErrorCode.USER_NOT_FOUND));
        BookmarkList bookmarkList = bookmarkListRepository.findById(listId)
                .orElseThrow(() -> new CustomException(ErrorCode.BOOKMARK_LIST_NOT_FOUND));
        BookmarkListLike existBookmarkListLike = bookmarkListLikeRepository.findByBookmarkListIdAndUserId(listId,userId);
        if (existBookmarkListLike == null) {
            throw new CustomException(ErrorCode.LIST_LIKE_NOT_FOUND);
        }
        bookmarkListLikeRepository.delete(existBookmarkListLike);
    }

    @Override
    public void scrapBookmarkList(Long userId, Long listId) throws RuntimeException {
        User user = userRepository.findById(userId)
                .orElseThrow(()-> new CustomException(ErrorCode.USER_NOT_FOUND));
        BookmarkList bookmarkList = bookmarkListRepository.findById(listId)
                .orElseThrow(() -> new CustomException(ErrorCode.BOOKMARK_LIST_NOT_FOUND));
        if(bookmarkListScrapRepository.findByUserIdAndBookmarkListId(userId,listId) != null) {
            throw new CustomException(ErrorCode.LIST_ALREADY_SCRAPPED);
        }
        BookmarkListScrap bookmarkListScrap = new BookmarkListScrap();
        bookmarkListScrap.addUserAndBookmarkList(user,bookmarkList);
        bookmarkListScrapRepository.save(bookmarkListScrap);
    }

    @Override
    @Transactional
    public void removeScrapBookmarkList(Long scrapId) throws RuntimeException {
        BookmarkListScrap existBookmarkListScrap = bookmarkListScrapRepository.findById(scrapId)
                .orElseThrow(() -> new CustomException(ErrorCode.LIST_NOT_SCRAPPED));
        bookmarkListScrapRepository.delete(existBookmarkListScrap);
    }


    @Transactional
    public void deleteRelations(Long userId, BookmarkList existingBookmarkList) throws RuntimeException{
        bookmarkListTagRepository.deleteAllByBookmarklList(existingBookmarkList);
        categoryRepository.deleteAllByBookmarklList(existingBookmarkList);
        groupRepository.deleteByBookmarkListAndUserIdNot(existingBookmarkList, userId);
    }

    private BookmarkListDetailDTO convertToBookmarkListDetailDTO(BookmarkList bookmarkList, Long userId) {
        // list 정보
        List<UserTitleDTO> users = getUserTitleDTOs(bookmarkList);
        Set<TagDTO> tags = getTagDTOs(bookmarkList);
        List<CategoryParamDTO> categories = getCategoryDTOs(bookmarkList);
        Integer likeCount = bookmarkList.getBookmarkListLikes().size();
        Boolean isLiked = bookmarkListLikeRepository.existsByBookmarkListIdAndUserId(bookmarkList.getId(), userId);
        Integer scrapCount = bookmarkList.getBookmarkListScraps().size();
        Boolean isScraped = bookmarkListScrapRepository.existsByUserIdAndBookmarkListId(userId, bookmarkList.getId());

        // bookmark 정보
        List<BookmarkDetailDTO> bookmarkDetails = bookmarkListRepository.findDetailedByListId(bookmarkList.getId());
        bookmarkDetails.forEach(bookmarkDetailDTO -> addAdditionalInfoForBookmarkDetailDTO(bookmarkDetailDTO, userId));

        return bookmarkList.makeBookmarkListDetailDTO(likeCount, scrapCount, isLiked, isScraped, categories, tags, users, bookmarkDetails);
    }

    private void addAdditionalInfoForBookmarkDetailDTO(BookmarkDetailDTO bookmarkDetailDTO, Long userId) {
        Bookmark bookmark = bookmarkRepository.findById(bookmarkDetailDTO.getId())
                .orElseThrow(() -> new CustomException(ErrorCode.BOOKMARK_NOT_FOUND));

        List<TagDTO> tagDTOs = bookmark.getBookmarkTags().stream()
                .map(bookmarkTag -> TagDTO.builder()
                        .title(bookmarkTag.getTag().getTitle())
                        .build())
                .collect(Collectors.toList());

        Integer bookmarkLikeCount = bookmark.getBookmarkLikes().size();
        Boolean isBookmarkLiked = bookmarkLikeRepository.existsByBookmarkIdAndUserId(bookmark.getId(), userId);

        bookmarkDetailDTO.addTagsAndLike(tagDTOs, bookmarkLikeCount, isBookmarkLiked);
    }

    private List<CategoryParamDTO> getCategoryDTOs(BookmarkList bookmarkList) {
        return bookmarkList.getCategories().stream()
                .map(category -> CategoryParamDTO.builder()
                        .categoryId(category.getId())
                        .categoryName(category.getName())
                        .build())
                .collect(Collectors.toList());
    }

    private BookmarkListResponseDTO convertToBookmarkListResponseDTO(BookmarkList bookmarkList, Long userId) {
        List<UserTitleDTO> users = getUserTitleDTOs(bookmarkList);
        Set<TagDTO> tags = getTagDTOs(bookmarkList);

        Integer likeCount = bookmarkList.getBookmarkListLikes().size();
        Boolean isLiked = (bookmarkListLikeRepository.findByBookmarkListIdAndUserId(bookmarkList.getId(), userId) != null);

        return bookmarkList.makeBookmarkListResponseDTO(bookmarkList.getBookmarks().size(), likeCount, isLiked, tags, users);
    }

    private List<UserTitleDTO> getUserTitleDTOs(BookmarkList bookmarkList) {
        return bookmarkList.getGroups().stream()
                .map(this::convertToUserTitleDTO)
                .collect(Collectors.toList());
    }

    private Set<TagDTO> getTagDTOs(BookmarkList bookmarkList) {
        return new HashSet<>(bookmarkList.getTags().stream()
                .map(this::convertToTagDTO)
                .collect(Collectors.toMap(
                        TagDTO::getTitle,
                        tagDTO -> tagDTO,
                        (existing, replacement) -> existing
                ))
                .values());
    }

    private UserTitleDTO convertToUserTitleDTO(UserGroup userGroup) {
        User user = userGroup.getUser();
        return UserTitleDTO.builder()
                .id(user.getId())
                .nickName(user.getNickname())
                .build();
    }

    private TagDTO convertToTagDTO(BookmarkListTag bookmarkListTag) {
        return TagDTO.builder()
                .title(bookmarkListTag.getTag().getTitle())
                .build();
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

    public BookmarkListRoadmapDTO toDto(BookmarkList bookmarkList){
        List<UserTitleDTO> users = bookmarkList.getGroups().stream()
                .map(this::convertToUserTitleDTO)
                .collect(Collectors.toList());

        Set<TagDTO> tags = new HashSet<>(bookmarkList.getTags().stream()
                .map(this::convertToTagDTO)
                .collect(Collectors.toMap(
                        TagDTO::getTitle, // Key: title
                        tagDTO -> tagDTO, // Value: tagDTO
                        (existing, replacement) -> existing // Handle duplicates by keeping the existing tagDTO
                ))
                .values());

        return BookmarkListRoadmapDTO.builder()
                .id(bookmarkList.getId())
                .title(bookmarkList.getTitle())
                .image(bookmarkList.getImage())
                .description(bookmarkList.getDescription())
                .bookmarkCount(bookmarkList.getBookmarks().size())
                .users(users)
                .tags(tags)
                .likeCount(1)  // This seems to be hardcoded, consider fetching the actual like count if possible.
                .build();

    }

    @Override
    public BookmarkListRoadmapDTO getBookmarkListResponseDTO(Long listId) {
        BookmarkList bookmarkList = bookmarkListRepository.findById(listId).orElseThrow();

        return toDto(bookmarkList);
    }

}
