package com.ssafy.itclips.recommend.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.itclips.recommend.dto.SimilarBookmarkResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.util.*;

@Service
@RequiredArgsConstructor
public class RecommendationServiceImpl implements RecommendationService {

    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;
    private final String fastApiBaseUrl = "http://127.0.0.1:8000"; // FastAPI URL

    @Override
    public List<SimilarBookmarkResponse> getPythonRecommendBookmarks(Long userId) {
        String url = fastApiBaseUrl + "/similar-bookmarklists/" + userId;

        try {
            ResponseEntity<String> responseEntity = restTemplate.getForEntity(url, String.class);

            if (responseEntity.getStatusCode().is2xxSuccessful()) {
                String responseBody = responseEntity.getBody();
                if (responseBody != null) {
                    List<SimilarBookmarkResponse> responses = objectMapper.readValue(responseBody, new TypeReference<List<SimilarBookmarkResponse>>(){});

                    // 유사도 기준으로 내림차순 정렬
                    responses.sort(Comparator.comparing(SimilarBookmarkResponse::getSimilarityScore).reversed());

                    return responses;
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }
}
