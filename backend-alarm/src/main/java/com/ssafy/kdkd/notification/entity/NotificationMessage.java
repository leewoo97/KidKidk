package com.ssafy.kdkd.notification.entity;

import lombok.*;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class NotificationMessage {
    private String subId;
    private String pubName;
    private String message;
    private String sub_message;
    private String key;
    private boolean isRead;
}
