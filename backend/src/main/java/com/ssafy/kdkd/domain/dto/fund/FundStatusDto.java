package com.ssafy.kdkd.domain.dto.fund;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class FundStatusDto {

    private boolean submit;

    private boolean answer;

    private Long childId;

}
