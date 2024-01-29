package com.ssafy.kdkd.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.kdkd.domain.entity.deposit.Deposit;
import com.ssafy.kdkd.repository.DepositRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class DepositService {

    private final DepositRepository depositRepository;

    public List<Deposit> findDepositByChild(Long childId) {
        return depositRepository.findDepositByChild(childId);
    }

}
