package com.ssafy.kdkd.domain.dto.fund;

import lombok.Data;

@Data
public class FundReservationDto {

    private Long id;

    private String name;

    private String content;

    private int yield;

    private boolean state;

    private Long childId;

    public FundReservationDto(Long id, String name, String content, int yield, boolean state, Long childId) {
        this.id = id;
        this.name = name;
        this.content = content;
        this.yield = yield;
        this.state = state;
        this.childId = childId;
    }
}
