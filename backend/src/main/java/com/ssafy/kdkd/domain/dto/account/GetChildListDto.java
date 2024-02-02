package com.ssafy.kdkd.domain.dto.account;

import lombok.Data;

@Data
public class GetChildListDto {
	private Long parentId;

	private Long childId;

	private String nickname;

	private String profileImage;

	public GetChildListDto(Long parentId, Long childId, String nickname, String profileImage) {
		this.parentId = parentId;
		this.childId = childId;
		this.nickname = nickname;
		this.profileImage = profileImage;
	}
}
