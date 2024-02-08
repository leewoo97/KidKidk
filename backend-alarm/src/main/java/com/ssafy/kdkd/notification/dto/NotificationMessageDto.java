package com.ssafy.kdkd.notification.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class NotificationMessageDto {
    private String subId;
    private String pubName;
    private String message;
    private String sub_message;
}
