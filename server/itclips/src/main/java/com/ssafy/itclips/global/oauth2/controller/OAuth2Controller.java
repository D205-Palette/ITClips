package com.ssafy.itclips.global.oauth2.controller;


import com.ssafy.itclips.global.jwt.JwtTokenProvider;
import com.ssafy.itclips.global.oauth2.request.UserInfoRequestDto;
import com.ssafy.itclips.global.oauth2.service.OAuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/oauth")
@RequiredArgsConstructor
public class OAuth2Controller {

    private JwtTokenProvider jwtTokenProvider;
    private OAuthService oAuthService;

    @GetMapping("/userinfo")
    public ResponseEntity<?> getUserInfo(@RequestBody UserInfoRequestDto userInfoRequestDto) {

        String accessToken = userInfoRequestDto.getAccessToken();
//        String provider = jwtTokenProvider.getProviderFromToken(accessToken);
//
//        if(provider.equals("google")) {
//            return ResponseEntity.ok(oAuthService.getGoogle());
//        }
//        else if(provider.equals("kakao")) {
//            return ResponseEntity.ok(oAuthService.getKaKao());
//        }
//        else if(provider.equals("naver")) {
//            return ResponseEntity.ok(oAuthService.getNaver());
//        }
//        else if(provider.equals("github")) {
//            return ResponseEntity.ok(oAuthService.getGitHub());
//        }
        return ResponseEntity.ok(HttpStatus.BAD_REQUEST);
    }
}
