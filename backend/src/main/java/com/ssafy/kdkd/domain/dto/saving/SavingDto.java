package com.ssafy.kdkd.domain.dto.saving;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class SavingDto {

    private Long id;

    private LocalDateTime startDate;

    private int count;

    private int payment;

    private int rate;

    private Long childId;

    public SavingDto(Long id, LocalDateTime startDate, int count, int payment, int rate, Long childId) {
        this.id = id;
        this.startDate = startDate;
        this.count = count;
        this.payment = payment;
        this.rate = rate;
        this.childId = childId;
    }
}
