package com.ssafy.kdkd.service.fund;

import com.ssafy.kdkd.domain.dto.fund.FundReservationDto;
import com.ssafy.kdkd.domain.entity.fund.Fund;
import com.ssafy.kdkd.domain.entity.fund.FundReservation;
import com.ssafy.kdkd.domain.entity.user.Child;
import com.ssafy.kdkd.repository.fund.FundRepository;
import com.ssafy.kdkd.repository.fund.FundReservationRepository;
import com.ssafy.kdkd.service.user.ChildService;

import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class FundReservationService {

    private final FundService fundService;
    private final FundRepository fundRepository;
    private final FundReservationRepository fundReservationRepository;
    private final ChildService childService;

    /**
     * 투자예약 삭제
     *
     * @param childId 자식 아이디
     * @return boolean 비어있는지 확인(true = 투자예약 X)
     */
    @Transactional
    public boolean delete(Long childId) {
        Optional<FundReservation> findFundReservation = fundReservationRepository.findById(childId);

        if (findFundReservation.isEmpty()) {
            return true;
        }

        fundReservationRepository.delete(findFundReservation.get());
        return false;
    }

    /**
     * 투자예약 생성
     *
     * @param fundReservationDto 투자예약 생성
     * @return fundReservationDto 생성된 투자예약
     */
    @Transactional
    public FundReservationDto createFundReservation(FundReservationDto fundReservationDto, boolean type) {
        Long childId = fundReservationDto.getChildId();
        Optional<FundReservation> findFundReservation = fundReservationRepository.findById(childId);

        if (findFundReservation.isPresent()) {
            return null;
        }

        if (type && fundReservationRepository.findById(childId).isPresent()) {
            return null;
        }

        Optional<Child> findChild = childService.findChild(childId);

        if (findChild.isEmpty()) {
            return null;
        }

        Child child = findChild.get();
        fundReservationDto.setYield((int) Math.floor(Math.random() * 10));
        fundReservationDto.setState(true);
        FundReservation fundReservation = FundReservation.createFundReservation(fundReservationDto);
        fundReservation.setChild(child);
        fundReservationRepository.save(fundReservation);
        return fundReservationDto;
    }

    /**
     * 투자예약 수정
     *
     * @param childId 자식 아이디
     * @param fundReservationDto 새로운 투자예약
     */
    @Transactional
    public FundReservationDto modifyFundReservation(Long childId, FundReservationDto fundReservationDto) {
        Optional<FundReservation> existingFundReservation = fundReservationRepository.findById(childId);

        if (existingFundReservation.isEmpty()) {
            return null;
        }

        Optional<Child> findChild = childService.findChild(childId);

        if (findChild.isEmpty()) {
            return null;
        }

        Child child = findChild.get();
        FundReservation reservation = existingFundReservation.get();
        reservation.updateFundReservation(fundReservationDto);
        reservation.setChild(child);
        fundReservationRepository.save(reservation);
        return fundReservationDto;
    }

    /**
     * 투자 삭제 예약
     *
     * @param childId 자식 아이디
     * @return FundReservationDto 투자예약(삭제 예약 상태 = state가 false)
     */
    @Transactional
    public FundReservationDto deleteFundReservation(Long childId) {
        Optional<Child> findChild = childService.findChild(childId);

        if (findChild.isEmpty()) {
            return null;
        }

        Child child = findChild.get();
        Optional<Fund> fund = fundRepository.findById(childId);

        if (fund.isEmpty()) {
            return null;
        }

        Fund existingFund = fund.get();
        FundReservationDto fundReservationDto =
            new FundReservationDto(existingFund.getName(), existingFund.getContent(), existingFund.getYield(), false, childId);
        FundReservation fundReservation = FundReservation.createFundReservation(fundReservationDto);
        fundReservation.setChild(child);
        fundReservationRepository.save(fundReservation);
        return fundReservationDto;
    }

}
