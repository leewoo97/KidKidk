package com.ssafy.kdkd.domain.dto.Alarm;

import lombok.AccessLevel;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class AlarmDto {

    private int type;
    private String content;
    private Long senderId;
    private Long receiverId;

}
