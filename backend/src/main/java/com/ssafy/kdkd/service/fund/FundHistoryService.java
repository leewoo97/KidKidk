package com.ssafy.kdkd.service.fund;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.kdkd.domain.entity.fund.FundHistory;

import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class FundHistorySerivce {

    private final FundHistorySerivce fundHistorySerivce;

    public void save(FundHistory fundHistory) {
        fundHistorySerivce.save(fundHistory);
    }

    public List<FundHistory> findFundHistoryByChildId(Long childId) {
        return fundHistorySerivce.findFundHistoryByChildId(childId);
    }

}
