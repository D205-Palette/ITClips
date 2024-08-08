package com.ssafy.itclips.bookmarklist.service;

import com.ssafy.itclips.alarm.entity.NotificationType;
import com.ssafy.itclips.alarm.service.NotificationService;
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
import com.ssafy.itclips.feed.repository.FeedRepository;
import com.ssafy.itclips.follow.entity.Follow;
import com.ssafy.itclips.follow.repository.FollowRepository;
import com.ssafy.itclips.global.file.DataResponseDto;
import com.ssafy.itclips.global.file.FileService;
import com.ssafy.itclips.global.rank.RankDTO;
import com.ssafy.itclips.group.entity.UserGroup;
import com.ssafy.itclips.group.repository.GroupRepository;
import com.ssafy.itclips.tag.dto.TagDTO;
import com.ssafy.itclips.tag.dto.TagSearchDTO;
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

    private final FollowRepository followRepository;
    private final FeedRepository feedRepository;

    private final NotificationService notificationService;


    private final static Integer USER_NUM = 1;

    @Override
    @Transactional
    public DataResponseDto createBookmarkList(Long userId, BookmarkListDTO bookmarkListDTO) throws RuntimeException {
        User user = userRepository.findById(userId)
                .orElseThrow(()-> new CustomException(ErrorCode.USER_NOT_FOUND));
        // 이미지 S3 경로로 저장
        String image = bookmarkListDTO.getImage();
        boolean isDefaultImage = "default".equals(image);

        DataResponseDto imageInfo = isDefaultImage ?
                DataResponseDto.builder()
                        .image(image)
                        .url(image)
                        .build() :
                DataResponseDto.of(fileService.getPresignedUrl("images", image, true));

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
        BookmarkList savedBookmarkList =  bookmarkListRepository.save(bookmarkList);

        //피드 저장
        List<Follow> followersList = followRepository.findByToId(userId);

        for(Follow follow : followersList) {
            feedRepository.saveFeed(follow.getFrom().getId(),savedBookmarkList.getId(), "listFeed");
        }

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
        // 이미지 S3 경로로 저장
        String image = bookmarkListDTO.getImage();
        boolean isDefaultImage = "default".equals(image);

        DataResponseDto imageInfo = isDefaultImage ?
                DataResponseDto.builder()
                        .image(image)
                        .url(image)
                        .build() :
                DataResponseDto.of(fileService.getPresignedUrl("images", image, true));

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
    public List<BookmarkListResponseDTO> getScrapedLists(Long userId, Long viewerId) throws RuntimeException {
        List<BookmarkListScrap> bookmarkListScraps = bookmarkListScrapRepository.findByUserId(userId);
        List<BookmarkList> bookmarkLists = getList(bookmarkListScraps);

        return bookmarkLists.stream()
                .map(bookmarkList -> convertToBookmarkListResponseDTO(bookmarkList, viewerId)) // userId를 추가로 전달
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public BookmarkListDetailDTO getListDetail(Long userId, Long listId) throws RuntimeException {
        BookmarkList bookmarkList = bookmarkListRepository.findById(listId)
                .orElseThrow(() -> new CustomException(ErrorCode.BOOKMARK_LIST_NOT_FOUND));
        bookmarkList.upHit();
        return convertToBookmarkListDetailDTO(bookmarkList, userId);
    }

    private static List<BookmarkList> getList(List<BookmarkListScrap> bookmarkListScraps) {
        return bookmarkListScraps.stream()
                .map(BookmarkListScrap::getBookmarkList)
                .toList();
    }

    //북마크 리스트 목록
    @Override
    @Transactional
    public List<BookmarkListResponseDTO> getLists(Long userId, Long viewerId, Boolean target) throws RuntimeException {
        List<BookmarkList> bookmarkLists = bookmarkListRepository.findDetailedByUserId(userId);

        if (bookmarkLists.isEmpty()) {
            throw new CustomException(ErrorCode.BOOKMARK_LIST_NOT_FOUND);
        }

        return bookmarkLists.stream()
                .map(bookmarkList -> convertToBookmarkListResponseDTO(bookmarkList,viewerId)) // userId를 추가로 전달
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

        Set<UserGroup> groups = bookmarkList.getGroups();

        for (UserGroup group : groups) {
            Long receiverId = group.getUser().getId();
            String senderNickname = user.getNickname();
            //알림 전송
            notificationService.sendNotification(userId, receiverId,listId,senderNickname, NotificationType.LIST_LIKE);
        }
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

        Set<UserGroup> groups = bookmarkList.getGroups();
        for (UserGroup group : groups) {
            Long receiverId = group.getUser().getId();
            // 알림 삭제
            notificationService.deleteNotification(userId, receiverId, listId, NotificationType.LIST_LIKE);
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

        //알림 전송
        Set<UserGroup> groups = bookmarkList.getGroups();

        for (UserGroup group : groups) {
            Long receiverId = group.getUser().getId();
            String senderNickname = user.getNickname();
            //알림 전송
            notificationService.sendNotification(userId, receiverId,listId,senderNickname, NotificationType.LIST_SCRAP);
        }
    }

    @Override
    @Transactional
    public void removeScrapBookmarkList(Long userId, Long listId) throws RuntimeException {
        BookmarkListScrap existBookmarkListScrap = bookmarkListScrapRepository.findByUserIdAndBookmarkListId(userId,listId);
        if(existBookmarkListScrap == null) {
            throw new CustomException(ErrorCode.LIST_NOT_SCRAPPED);
        }
        //스크랩 취소 알림 삭제
        BookmarkList bookmarkList = bookmarkListRepository.findById(listId)
                .orElseThrow(() -> new CustomException(ErrorCode.BOOKMARK_LIST_NOT_FOUND));

        Set<UserGroup> groups = bookmarkList.getGroups();
        for (UserGroup group : groups) {
            Long receiverId = group.getUser().getId();
            // 알림 삭제
            notificationService.deleteNotification(userId, receiverId, listId, NotificationType.LIST_SCRAP);
        }

        bookmarkListScrapRepository.delete(existBookmarkListScrap);
    }


    @Transactional
    public void deleteRelations(Long userId, BookmarkList existingBookmarkList) throws RuntimeException{
        bookmarkListTagRepository.deleteAllByBookmarklList(existingBookmarkList);
        categoryRepository.deleteAllByBookmarklList(existingBookmarkList);
        groupRepository.deleteByBookmarkListAndUserIdNot(existingBookmarkList, userId);
    }

    @Override
    public List<RankDTO> getListsRankingByLikes() throws RuntimeException {
        return bookmarkListRepository.findListRankingByLike();
    }

    @Override
    public List<RankDTO> getListsRankingByHit() throws RuntimeException {
        List<BookmarkList> listsRankingByHit = bookmarkListRepository.findTop10ByOrderByHitDesc();
        List<RankDTO> rankDTOs = new ArrayList<>();
        for (BookmarkList bookmarkList : listsRankingByHit) {
            rankDTOs.add(bookmarkList.toRankDTO());
        }
        return rankDTOs;
    }

    @Override
    public List<RankDTO> getListsRankingByScrap() throws RuntimeException {
        return bookmarkListRepository.findListRankingByScrap();
    }

    @Override
    @Transactional
    public List<BookmarkListResponseDTO> searchLists(Integer page, String searchType, Long userId, String title) throws RuntimeException {

        //searchType hit,like,scrap으로 분기
        List<BookmarkList> bookmarkLists;

        bookmarkLists = searchType.equals("hit") ? bookmarkListRepository.findBookmarkListByTitleAndHit(title, page) :
                searchType.equals("scrap") ? bookmarkListRepository.findBookmarkListByTitleAndScrap(title, page) :
                        bookmarkListRepository.findBookmarkListByTitleAndLike(title, page);


        if (bookmarkLists.isEmpty()) {
            throw new CustomException(ErrorCode.BOOKMARK_LIST_NOT_FOUND);
        }

        return bookmarkLists.stream()
                .map(bookmarkList -> convertToBookmarkListResponseDTO(bookmarkList,userId)) // userId를 추가로 전달
                .collect(Collectors.toList());
    }

    @Override
    public List<BookmarkListResponseDTO> searchListsByTags(Integer page, Long userId, TagSearchDTO tagSearchDTO) throws RuntimeException {

        List<BookmarkList> bookmarkLists = bookmarkListRepository.findBookmarkListByTags(tagSearchDTO,page);

        if (bookmarkLists.isEmpty()) {
            throw new CustomException(ErrorCode.BOOKMARK_LIST_NOT_FOUND);
        }

        return bookmarkLists.stream()
                .map(bookmarkList -> convertToBookmarkListResponseDTO(bookmarkList,userId)) // userId를 추가로 전달
                .collect(Collectors.toList());
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

        String imageUrl = getImageUrl(bookmarkList);
        // bookmark 정보
        List<BookmarkDetailDTO> bookmarkDetails = bookmarkListRepository.findDetailedByListId(bookmarkList.getId());
        bookmarkDetails.forEach(bookmarkDetailDTO -> addAdditionalInfoForBookmarkDetailDTO(bookmarkDetailDTO, userId));

        return bookmarkList.makeBookmarkListDetailDTO(likeCount, scrapCount, isLiked, isScraped, imageUrl, categories, tags, users, bookmarkDetails);
    }

    private String getImageUrl(BookmarkList bookmarkList) {
        String imageUrl = bookmarkList.getImage();
        if(!"default".equals(imageUrl)) {
            imageUrl = fileService.getPresignedUrl("images", bookmarkList.getImage(), false).get("url");
        }
        return imageUrl;
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

    @Override
    public BookmarkListResponseDTO convertToBookmarkListResponseDTO(BookmarkList bookmarkList, Long viewerId) {
        List<UserTitleDTO> users = getUserTitleDTOs(bookmarkList);
        Set<TagDTO> tags = getTagDTOs(bookmarkList);

        Integer likeCount = bookmarkList.getBookmarkListLikes().size();
        Boolean isLiked = (bookmarkListLikeRepository.findByBookmarkListIdAndUserId(bookmarkList.getId(), viewerId) != null);
        String imageUrl = getImageUrl(bookmarkList);

        return bookmarkList.makeBookmarkListResponseDTO(bookmarkList.getBookmarks().size(), likeCount, isLiked, imageUrl, tags, users);
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
        String imageUrl = getImageUrl(bookmarkList);
        return BookmarkListRoadmapDTO.builder()
                .id(bookmarkList.getId())
                .title(bookmarkList.getTitle())
                .image(imageUrl)
                .description(bookmarkList.getDescription())
                .bookmarkCount(bookmarkList.getBookmarks().size())
                .users(users)
                .tags(tags)
                .build();

    }

    @Override
    public BookmarkListRoadmapDTO getBookmarkListResponseDTO(Long listId) {
        BookmarkList bookmarkList = bookmarkListRepository.findById(listId).orElseThrow();
        return toDto(bookmarkList);
    }

}
