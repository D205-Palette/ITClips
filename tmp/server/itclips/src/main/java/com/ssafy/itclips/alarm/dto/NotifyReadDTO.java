package com.ssafy.itclips.alarm.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class NotifyReadDTO {

    private List<Long> notificationIds;

    @Builder
    public NotifyReadDTO(List<Long> notificationIds) {
        this.notificationIds = notificationIds;
    }
}
