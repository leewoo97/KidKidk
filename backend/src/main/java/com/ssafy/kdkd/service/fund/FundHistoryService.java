package com.ssafy.kdkd.service.fund;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.kdkd.domain.entity.fund.FundHistory;
import com.ssafy.kdkd.repository.fund.FundHistoryRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class FundHistoryService {

    private final FundHistoryRepository fundHistoryRepository;

    public void save(FundHistory fundHistory) {
        fundHistoryRepository.save(fundHistory);
    }

    public List<FundHistory> findFundHistoryByChildId(Long childId) {
        return fundHistoryRepository.findFundHistoryByChildId(childId);
    }

}
