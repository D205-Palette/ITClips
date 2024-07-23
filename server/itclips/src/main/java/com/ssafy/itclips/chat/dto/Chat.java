package com.ssafy.itclips.chat.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ChatUser {
    private List<String> users;
    private Long roomId;
}
