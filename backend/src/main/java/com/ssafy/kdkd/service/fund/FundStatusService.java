package com.ssafy.kdkd.service.fund;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.kdkd.domain.entity.fund.FundStatus;
import com.ssafy.kdkd.repository.fund.FundStatusRepository;

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
    public void deleteAll() {
        em.createQuery("DELETE FROM FundStatus").executeUpdate();
    }

}
