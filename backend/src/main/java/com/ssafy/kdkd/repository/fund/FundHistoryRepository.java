package com.ssafy.kdkd.repository.fund;

import com.ssafy.kdkd.domain.entity.fund.FundHistory;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface FundHistoryRepository extends JpaRepository<FundHistory, Long> {

    @Query("SELECT fh FROM FundHistory fh WHERE fh.child.id = :childId")
    List<FundHistory> findFundHistoryByChildId(@Param("childId") Long childId);

}
