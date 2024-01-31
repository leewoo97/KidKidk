package com.ssafy.kdkd.domain.dto.Deposit;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.ssafy.kdkd.domain.entity.deposit.Deposit;

import lombok.AccessLevel;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor(access = AccessLevel.PROTECTED)
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

    public static DepositDto mappingDepositDto(Deposit deposit) {
        DepositDto depositDto = new DepositDto();
        depositDto.dataLog = deposit.getDataLog();
        depositDto.detail = deposit.getDetail();
        depositDto.type = deposit.isType();
        depositDto.amount = deposit.getAmount();
        depositDto.money = deposit.getMoney();
        depositDto.childId = deposit.getId();
        return depositDto;
    }

    public static List<DepositDto> mappingDepositDto(List<Deposit> deposits) {
        List<DepositDto> depositDtoList = new ArrayList<>();
        for (Deposit deposit : deposits) {
            depositDtoList.add(mappingDepositDto(deposit));
        }
        return depositDtoList;
    }
}
