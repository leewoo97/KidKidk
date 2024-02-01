package com.ssafy.kdkd.domain.dto.account;

import lombok.Data;

@Data
public class ProfileDto {

	private String nickname;

	private int pin;

	private String profileImage;

	private boolean type;

	private Long userId;

	public ProfileDto() {
	}

	public ProfileDto(String nickname, int pin, String profileImage, boolean type, Long userId) {
		this.nickname = nickname;
		this.pin = pin;
		this.profileImage = profileImage;
		this.type = type;
		this.userId = userId;
	}
}
