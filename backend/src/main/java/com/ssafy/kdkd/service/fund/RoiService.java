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
import lombok.extern.slf4j.Slf4j;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
@Slf4j
public class RoiService {

    private final RoiRepository roiRepository;
    private final ChildService childService;

    public Optional<Roi> findById(Long childId) {
        return roiRepository.findById(childId);
    }

    /**
     * roi 생성
     * 
     * @param roiDto 생성할 roi 정보
     */
    @Transactional
    public void createRoi(RoiDto roiDto) {
        Child child = childService.findChild(roiDto.getChildId()).get();
        Roi roi = Roi.createRoi(roiDto);
        roi.setChild(child);
        roiRepository.save(roi);
    }

    /**
     * roi 수정
     * 
     * @param roi 기존 roi
     * @param roiDto 업데이트할 roi 정보
     */
    @Transactional
    public void updateRoi(Roi roi, RoiDto roiDto) {
        Optional<Child> findChild = childService.findChild(roiDto.getChildId());

        if (findChild.isEmpty()) {
            log.info("ROI 수정 실패");
            return;
        }

        Child child = findChild.get();
        roi.updateRoi(roiDto);
        roi.setChild(child);
        roiRepository.save(roi);
    }

}