package com.ssafy.kdkd.service.fund;

import com.ssafy.kdkd.domain.dto.fund.FundStatusDto;
import com.ssafy.kdkd.domain.entity.fund.Fund;
import com.ssafy.kdkd.domain.entity.fund.FundStatus;
import com.ssafy.kdkd.repository.fund.FundStatusRepository;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class FundStatusService {

    private final FundStatusRepository fundStatusRepository;
    private final EntityManager em;

    public void save(FundStatus fundStatus) {
        fundStatusRepository.save(fundStatus);
    }

    public Optional<FundStatus> findById(Long fundId) {
        return fundStatusRepository.findById(fundId);
    }

    public List<FundStatus> findAll() {
        return fundStatusRepository.findAll();
    }

    @Transactional
    public void insertStatus(FundStatusDto fundStatusDto, Fund fund) {
        FundStatus fundStatus = FundStatus.createFundStatus(fundStatusDto);
        fundStatus.setFund(fund);
        save(fundStatus);
    }

    @Transactional
    public void updateStatus(FundStatus fundStatus) {
        save(fundStatus);
    }

    @Transactional
    public void deleteAll() {
        em.createQuery("DELETE FROM FundStatus").executeUpdate();
    }

}
