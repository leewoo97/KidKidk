package com.ssafy.kdkd.domain.dto.saving;

import com.ssafy.kdkd.domain.entity.saving.SavingHistory;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import lombok.AccessLevel;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor(access = AccessLevel.PROTECTED)
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

    public static SavingHistoryDto mappingSavingHistoryDto(SavingHistory savingHistory) {
        SavingHistoryDto savingHistoryDto = new SavingHistoryDto();
        savingHistoryDto.dataLog = savingHistory.getDataLog();
        savingHistoryDto.detail = savingHistory.getDetail();
        savingHistoryDto.type = savingHistory.isType();
        savingHistoryDto.amount = savingHistory.getAmount();
        savingHistoryDto.childId = savingHistory.getId();
        return savingHistoryDto;
    }

    public static List<SavingHistoryDto> mappingSavingHistoryDto(List<SavingHistory> list) {
        List<SavingHistoryDto> savingHistoryDtoList = new ArrayList<>();
        for (SavingHistory savingHistory : list) {
            savingHistoryDtoList.add(mappingSavingHistoryDto(savingHistory));
        }
        return savingHistoryDtoList;
    }
}
