package com.ssafy.kdkd.repository.fund;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.kdkd.domain.entity.fund.FundStatus;

public interface FundStatusRepository extends JpaRepository<FundStatus, Long> {
}
