package com.ssafy.kdkd.domain.dto.fund;

import com.ssafy.kdkd.domain.entity.fund.Roi;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class RoiDto {

    private int success;

    private int count;

    private Long childId;

    public static RoiDto mappingRoiDto(Roi roi) {
        RoiDto roiDto = new RoiDto();
        roiDto.success = roi.getSuccess();
        roiDto.count = roi.getCount();
        roiDto.childId = roi.getId();
        return roiDto;
    }

}
