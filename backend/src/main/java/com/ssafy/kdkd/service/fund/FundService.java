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

    @Transactional
    public void delete(Fund fund) {
        fundRepository.delete(fund);
    }

    @Transactional
    public void deleteById(Long childId) {
        fundRepository.deleteById(childId);
    }

    /**
     * 투자계좌 -> 예금계좌 이체
     *
     * @param transferDto 이체 금액, 자식 아이디
     * @return boolean(이체가능 금액확인)
     */
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
        String detail = "투자 이체";
        boolean type = true;
        int money = fundMoney;

        DepositDto depositDto = new DepositDto(LocalDateTime.now(), detail, type, money, updateCoin, childId);
        Deposit deposit = createDeposit(depositDto);
        deposit.setChild(child);
        depositRepository.save(deposit);
        return true;
    }

    /**
     * 투자예약 -> 투자 생성
     *
     * @param fundReservation 투자예약
     */
    @Transactional
    public void insertFund(FundReservation fundReservation) {
        Child child = childService.findChild(fundReservation.getId()).get();
        Fund fund = Fund.createFund(fundReservation);
        fund.setChild(child);
        save(fund);
    }

}
