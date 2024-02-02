package com.ssafy.kdkd.repository.fund;

import com.ssafy.kdkd.domain.entity.fund.FundHistory;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface FundHistoryRepository extends JpaRepository<FundHistory, Long> {

    List<FundHistory> findFundHistoriesByChildId(Long childId);

}
