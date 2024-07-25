package com.ssafy.itclips.global.oauth2.userinfo;

import java.util.Map;

public class GithubOAuth2UserInfo extends OAuth2UserInfo{

    public GithubOAuth2UserInfo(Map<String, Object> attributes) {
        super(attributes);
    }

    @Override
    public String getId() {
        return (String) attributes.get("id");
    }

    @Override
    public String getNickname() {
        return (String) attributes.get("login");
    }

    @Override
    public String getImageUrl() {
        return (String) attributes.get("avatar_url");
    }

    @Override
    public String getEmail() {
        return (String) attributes.get("html_url");
    }

    @Override
    public String getPassword() {
        return "DEFAULT_PASSWORD";
    }

}
