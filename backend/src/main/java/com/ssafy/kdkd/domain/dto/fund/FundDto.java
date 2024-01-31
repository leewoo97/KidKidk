package com.ssafy.kdkd.domain.dto.fund;

import com.ssafy.kdkd.domain.entity.fund.Fund;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class FundDto {

    private String name;

    private String content;

    private int yield;

    private Long childId;

    public static FundDto mappingFundDto(Fund fund) {
        FundDto fundDto = new FundDto();
        fundDto.name = fund.getName();
        fundDto.content = fund.getContent();
        fundDto.yield = fund.getYield();
        fundDto.childId = fund.getId();
        return fundDto;
    }
}
