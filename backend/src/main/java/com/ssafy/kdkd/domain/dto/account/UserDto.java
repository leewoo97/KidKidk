package com.ssafy.kdkd.domain.dto.account;

import lombok.Data;

@Data
public class UserDto {

    private Long userId;

    private String accessToken;

    private String email;

    public UserDto() {
    }

    public UserDto(String accessToken, String email) {
        this.accessToken = accessToken;
        this.email = email;
    }
}
