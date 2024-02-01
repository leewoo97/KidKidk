package com.ssafy.kdkd.domain.dto.fund;

import java.time.LocalDateTime;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class FundHistoryDto {

    private LocalDateTime dataLog;
    private int seedMoney;
    private int yield;
    private int pnl;
    private Long childId;

}
