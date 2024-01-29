package com.ssafy.kdkd.service.fund;

import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.kdkd.domain.entity.fund.FundReservation;
import com.ssafy.kdkd.repository.fund.FundReservationRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class FundReservationService {

    private final FundReservationRepository fundReservationRepository;

    public void save(FundReservation fundReservation) {
        fundReservationRepository.save(fundReservation);
    }

    public Optional<FundReservation> findById(Long childId) {
        return fundReservationRepository.findById(childId);
    }

    public void delete(FundReservation fundReservation) {
        fundReservationRepository.delete(fundReservation);
    }

}
