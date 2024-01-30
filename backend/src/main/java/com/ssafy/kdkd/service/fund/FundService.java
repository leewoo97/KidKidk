package com.ssafy.kdkd.service.fund;

import com.ssafy.kdkd.domain.entity.fund.Fund;
import com.ssafy.kdkd.repository.fund.FundRepository;

import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class FundService {

    private final FundRepository fundRepository;

    public void save(Fund fund) {
        fundRepository.save(fund);
    }

    public Optional<Fund> findById(Long childId) {
        return fundRepository.findById(childId);
    }

    public void delete(Fund fund) {
        fundRepository.delete(fund);
    }

}
