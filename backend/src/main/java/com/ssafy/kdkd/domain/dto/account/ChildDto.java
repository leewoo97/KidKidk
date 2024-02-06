package com.ssafy.kdkd.domain.dto.account;

import lombok.Data;

@Data
public class ChildDto {
	private Long childId;

	private int coin;

	private int fundMoney;

	public ChildDto(Long childId, int coin, int fundMoney) {
		this.childId = childId;
		this.coin = coin;
		this.fundMoney = fundMoney;
	}
}
