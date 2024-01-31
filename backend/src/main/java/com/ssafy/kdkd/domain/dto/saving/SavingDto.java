package com.ssafy.kdkd.domain.dto.saving;

import com.ssafy.kdkd.domain.entity.saving.Saving;

import java.time.LocalDateTime;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class SavingDto {

    private LocalDateTime startDate;

    private int count;

    private int payment;

    private int rate;

    private Long childId;

    public static SavingDto mappingSavingDto(Saving saving) {
        SavingDto savingDto = new SavingDto();
        savingDto.startDate = saving.getStartDate();
        savingDto.count = saving.getCount();
        savingDto.payment = saving.getPayment();
        savingDto.rate = saving.getRate();
        savingDto.childId = saving.getId();
        return savingDto;
    }
}
