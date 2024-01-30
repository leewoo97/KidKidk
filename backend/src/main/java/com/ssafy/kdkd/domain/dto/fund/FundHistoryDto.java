package com.ssafy.kdkd.domain.dto.fund;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class FundHistoryDto {

    private Long id;

    private LocalDateTime dataLog;

    private int seedMoney;

    private int yield;

    private int pnl;

    private Long childId;

    public FundHistoryDto(Long id, LocalDateTime dataLog, int seedMoney, int yield, int pnl, Long childId) {
        this.id = id;
        this.dataLog = dataLog;
        this.seedMoney = seedMoney;
        this.yield = yield;
        this.pnl = pnl;
        this.childId = childId;
    }
}
