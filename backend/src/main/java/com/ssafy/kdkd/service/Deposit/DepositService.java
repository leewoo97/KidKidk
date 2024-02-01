package com.ssafy.kdkd.service.Deposit;

import com.ssafy.kdkd.domain.entity.deposit.Deposit;
import com.ssafy.kdkd.repository.Deposit.DepositRepository;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class DepositService {

    private final DepositRepository depositRepository;

    public List<Deposit> findDepositByChildId(Long childId) {
        return depositRepository.findDepositByChildId(childId);
    }

}
