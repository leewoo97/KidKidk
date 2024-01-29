package com.ssafy.kdkd.domain.dto.Deposit;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class DepositDto {

    private LocalDateTime dataLog;

    private String detail;

    private boolean type;

    private int amount;

    private int money;

    private Long childId;

    public DepositDto(LocalDateTime dataLog, String detail, boolean type, int amount, int money, Long childId) {
        this.dataLog = dataLog;
        this.detail = detail;
        this.type = type;
        this.amount = amount;
        this.money = money;
        this.childId = childId;
    }
}
