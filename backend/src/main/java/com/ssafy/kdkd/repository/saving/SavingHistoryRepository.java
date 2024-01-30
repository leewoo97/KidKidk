package com.ssafy.kdkd.repository.saving;

import com.ssafy.kdkd.domain.entity.saving.SavingHistory;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface SavingHistoryRepository extends JpaRepository<SavingHistory, Long> {

    @Query("SELECT sh FROM SavingHistory sh WHERE sh.child.id = :childId")
    List<SavingHistory> findSavingHistoriesByChild_Id(@Param("childId") Long childId);

    @Modifying
    @Query("DELETE FROM SavingHistory sh WHERE sh.child.id = :childId")
    void deleteSavingHistoryByChhildId(@Param("childId") Long childId);

}
