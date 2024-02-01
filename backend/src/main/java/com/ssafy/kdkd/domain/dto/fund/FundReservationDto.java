package com.ssafy.kdkd.domain.dto.fund;

import com.ssafy.kdkd.domain.entity.fund.FundReservation;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class FundReservationDto {

    private String name;

    private String content;

    private int yield;

    private boolean state;

    private Long childId;

    public static FundReservationDto mappingFundReservationDto(FundReservation fundReservation) {
        FundReservationDto fundReservationDto = new FundReservationDto();
        fundReservationDto.name = fundReservation.getName();
        fundReservationDto.content = fundReservation.getContent();
        fundReservationDto.yield = fundReservation.getYield();
        fundReservationDto.state = fundReservation.isState();
        fundReservationDto.childId = fundReservationDto.getChildId();
        return fundReservationDto;
    }
}
