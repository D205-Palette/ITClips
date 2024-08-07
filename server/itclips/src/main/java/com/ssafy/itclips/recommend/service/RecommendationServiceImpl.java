package com.ssafy.itclips.recommend.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.itclips.bookmarklist.dto.BookmarkListResponseDTO;
import com.ssafy.itclips.bookmarklist.entity.BookmarkList;
import com.ssafy.itclips.bookmarklist.repository.BookmarkListRepository;
import com.ssafy.itclips.bookmarklist.service.BookmarkListService;
import com.ssafy.itclips.error.CustomException;
import com.ssafy.itclips.error.ErrorCode;
import com.ssafy.itclips.recommend.dto.SimilarBookmarkResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RecommendationServiceImpl implements RecommendationService {

    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;
    private final BookmarkListRepository bookmarkListRepository;
    private final BookmarkListService bookmarkListService;

    @Value("${FAST_API_SERVER}")
    private String fastApiBaseUrl;

    @Override
    public List<BookmarkListResponseDTO> getPythonRecommendBookmarks(Long userId) throws RuntimeException{
        String url = fastApiBaseUrl + "/similar-bookmarklists/" + userId;

        try {
            ResponseEntity<String> responseEntity = restTemplate.getForEntity(url, String.class);

            if (responseEntity.getStatusCode().is2xxSuccessful()) {
                String responseBody = responseEntity.getBody();
                if (responseBody != null) {
                    List<SimilarBookmarkResponse> responses = objectMapper.readValue(responseBody, new TypeReference<List<SimilarBookmarkResponse>>(){});

                    // 유사도 기준으로 내림차순 정렬
                    responses.sort(Comparator.comparing(SimilarBookmarkResponse::getSimilarityScore).reversed());

                    return convertResponseToListResponseDto(responses,userId);
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

    public List<BookmarkListResponseDTO> convertResponseToListResponseDto(List<SimilarBookmarkResponse> similarBookmarkResponses,Long userId) {
        List<BookmarkList> bookmarkLists = bookmarkListRepository.findBookmarkListByIds(similarBookmarkResponses);
        if (bookmarkLists == null) {
            throw new CustomException(ErrorCode.RECOMMEND_NOT_FOUND);
        }
        return bookmarkLists.stream()
                .map(bookmarkList -> bookmarkListService.convertToBookmarkListResponseDTO(bookmarkList,userId)) // userId를 추가로 전달
                .collect(Collectors.toList());
    }
}
