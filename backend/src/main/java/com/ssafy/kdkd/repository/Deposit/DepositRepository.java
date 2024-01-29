package com.ssafy.kdkd.repository.Deposit;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ssafy.kdkd.domain.entity.deposit.Deposit;

public interface DepositRepository extends JpaRepository<Deposit, Long> {

    @Query("SELECT d FROM Deposit d WHERE d.child.id = :childId")
    List<Deposit> findDepositByChild(@Param("childId") Long childId);

}
