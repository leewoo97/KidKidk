package com.ssafy.kdkd.domain.dto.fund;

import com.ssafy.kdkd.domain.entity.fund.FundHistory;

import java.time.LocalDateTime;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class FundHistoryDto {

    private LocalDateTime dataLog;
    private int seedMoney;
    private int yield;
    private int pnl;
    private Long childId;

    public static FundHistoryDto mappingFundHistoryDto(FundHistory fundHistory) {
        return FundHistoryDto.builder()
            .dataLog(fundHistory.getDataLog())
            .seedMoney(fundHistory.getSeedMoney())
            .yield(fundHistory.getYield())
            .pnl(fundHistory.getPnl())
            .childId(fundHistory.getChild().getId())
            .build();
    }

}
