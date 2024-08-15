package com.ssafy.itclips.global.oauth2.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserInfoResponse {

        private String id;
        private String name;
        private String email;
        private String provider;

}
