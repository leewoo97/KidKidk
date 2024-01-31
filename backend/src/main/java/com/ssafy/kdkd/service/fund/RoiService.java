package com.ssafy.kdkd.service.fund;

import java.util.Optional;

import com.ssafy.kdkd.domain.dto.fund.RoiDto;
import com.ssafy.kdkd.domain.entity.fund.Roi;
import com.ssafy.kdkd.domain.entity.user.Child;
import com.ssafy.kdkd.repository.fund.RoiRepository;
import com.ssafy.kdkd.service.user.ChildService;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class RoiService {

    private final RoiRepository roiRepository;
    private final ChildService childService;

    public Optional<Roi> findById(Long childId) {
        return roiRepository.findById(childId);
    }

    @Transactional
    public void createRoi(RoiDto roiDto) {
        Child child = childService.findChild(roiDto.getChildId()).get();
        Roi roi = Roi.createRoi(roiDto);
        roi.setChild(child);
        roiRepository.save(roi);
    }

    @Transactional
    public void updateRoi(Roi roi, RoiDto roiDto) {
        Child child = childService.findChild(roiDto.getChildId()).get();
        roi.updateRoi(roiDto);
        roi.setChild(child);
        roiRepository.save(roi);
    }

}
