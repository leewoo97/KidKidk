package com.ssafy.kdkd.service.fund;

import com.ssafy.kdkd.domain.dto.fund.FundDto;
import com.ssafy.kdkd.domain.dto.fund.FundReservationDto;
import com.ssafy.kdkd.domain.entity.fund.FundReservation;
import com.ssafy.kdkd.domain.entity.user.Child;
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

    private final FundReservationRepository fundReservationRepository;
    private final ChildService childService;

    public void save(FundReservation fundReservation) {
        fundReservationRepository.save(fundReservation);
    }

    public Optional<FundReservation> findById(Long childId) {
        return fundReservationRepository.findById(childId);
    }

    public void delete(FundReservation fundReservation) {
        fundReservationRepository.delete(fundReservation);
    }

    @Transactional
    public FundReservationDto createFundReservation(FundReservationDto fundReservationDto) {
        Child child = childService.findChild(fundReservationDto.getChildId()).get();
        fundReservationDto.setYield((int) Math.floor(Math.random() * 10));
        FundReservation fundReservation = FundReservation.createFundReservation(fundReservationDto);
        fundReservation.setChild(child);
        save(fundReservation);
        return fundReservationDto;
    }

    @Transactional
    public FundDto createFundReservation(FundDto fundDto, boolean state) {
        int yield = (int) Math.floor(Math.random() * 10);
        FundReservationDto setFundReservationDto
            = new FundReservationDto(fundDto.getName(), fundDto.getContent(), yield, state,
            fundDto.getChildId());
        Child child = childService.findChild(fundDto.getChildId()).get();
        FundReservation fundReservation = FundReservation.createFundReservation(setFundReservationDto);
        fundReservation.setChild(child);
        save(fundReservation);
        fundDto.setYield(yield);
        return fundDto;
    }

    @Transactional
    public void modifyFundReservation(FundReservation reservation, FundReservationDto fundReservationDto) {
        Child child = childService.findChild(fundReservationDto.getChildId()).get();
        reservation.updateFundReservation(fundReservationDto);
        reservation.setChild(child);
        save(reservation);
    }
}
