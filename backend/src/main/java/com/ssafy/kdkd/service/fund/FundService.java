package com.ssafy.kdkd.service.fund;

import static com.ssafy.kdkd.domain.entity.deposit.Deposit.createDeposit;

import com.ssafy.kdkd.domain.dto.Deposit.DepositDto;
import com.ssafy.kdkd.domain.dto.fund.TransferDto;
import com.ssafy.kdkd.domain.entity.deposit.Deposit;
import com.ssafy.kdkd.domain.entity.fund.Fund;
import com.ssafy.kdkd.domain.entity.fund.FundReservation;
import com.ssafy.kdkd.domain.entity.user.Child;
import com.ssafy.kdkd.repository.Deposit.DepositRepository;
import com.ssafy.kdkd.repository.fund.FundRepository;
import com.ssafy.kdkd.service.user.ChildService;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class FundService {

    private final FundRepository fundRepository;
    private final ChildService childService;
    private final DepositRepository depositRepository;

    public void save(Fund fund) {
        fundRepository.save(fund);
    }

    public Optional<Fund> findById(Long childId) {
        return fundRepository.findById(childId);
    }

    public void delete(Fund fund) {
        fundRepository.delete(fund);
    }

    @Transactional
    public boolean transfer(TransferDto transferDto) {
        int fundMoney = transferDto.getFundMoney();
        Long childId = transferDto.getChildId();
        Child child = childService.findChild(childId).get();
        int updateFundMoney = child.getFundMoney() - fundMoney;
        int updateCoin = child.getCoin() + fundMoney;
        if (child.getFundMoney() - fundMoney < 0) {
            return false;
        }

        child.transferChild(updateFundMoney);
        child.updateChild(updateCoin);

        // deposit
        String detail = "투자금 이체";
        boolean type = true;
        int money = fundMoney;

        DepositDto depositDto = new DepositDto(LocalDateTime.now(), detail, type, money, updateCoin, childId);
        Deposit deposit = createDeposit(depositDto);
        deposit.setChild(child);
        depositRepository.save(deposit);
        return true;
    }

    @Transactional
    public void insertFund(FundReservation fundReservation) {
        Child child = childService.findChild(fundReservation.getId()).get();
        Fund fund = Fund.createFund(fundReservation);
        fund.setChild(child);
        save(fund);
    }

    @Transactional
    public void updateFund() {
        // 투자
        // 투자예약
    }

}
