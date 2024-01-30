package com.ssafy.kdkd.domain.dto.saving;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class SavingHistoryDto {

    private Long id;

    private LocalDateTime dataLog;

    private String detail;

    private boolean type;

    private int amount;

    private Long childId;

    public SavingHistoryDto(Long id, LocalDateTime dataLog, String detail, boolean type, int amount, Long childId) {
        this.id = id;
        this.dataLog = dataLog;
        this.detail = detail;
        this.type = type;
        this.amount = amount;
        this.childId = childId;
    }
}
