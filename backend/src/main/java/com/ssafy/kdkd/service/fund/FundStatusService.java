package com.ssafy.kdkd.service.fund;

import com.ssafy.kdkd.domain.dto.fund.FundStatusDto;
import com.ssafy.kdkd.domain.entity.fund.Fund;
import com.ssafy.kdkd.domain.entity.fund.FundStatus;
import com.ssafy.kdkd.domain.entity.user.Child;
import com.ssafy.kdkd.repository.fund.FundRepository;
import com.ssafy.kdkd.repository.fund.FundStatusRepository;
import com.ssafy.kdkd.service.user.ChildService;

import java.util.Optional;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class FundStatusService {

    private final FundService fundService;
    private final FundRepository fundRepository;
    private final ChildService childService;
    private final FundStatusRepository fundStatusRepository;
    private final EntityManager em;

    /**
     * 투자 상태 업데이트
     *
     * @param fundStatusDto 투자상태
     * @param isChild 투자 정보 업데이트 주체(자식 or 부모)
     * @return boolean when : 투자가 존재 X or 투자 금액 > 소지금액 -> true
     */
    @Transactional
    public boolean setFundStatus(FundStatusDto fundStatusDto, boolean isChild) {
        Long childId = fundStatusDto.getChildId();
        Optional<Fund> findFund = fundRepository.findById(childId);
        Optional<FundStatus> findFundStatus = fundStatusRepository.findById(childId);

        if (findFund.isEmpty()) {
            return true;
        }

        Fund fund = findFund.get();
        Optional<Child> findChild = childService.findChild(childId);

        if (findChild.isEmpty()) {
            return false;
        }

        Child child = findChild.get();
        int fundMoney = child.getFundMoney();
        int amount = fundStatusDto.getAmount();

        if (findFundStatus.isEmpty()) {
            insertStatus(fundStatusDto, fund);
        } else {
            FundStatus fundStatus = findFundStatus.get();
            if (isChild) {
                if (fundMoney < amount) {
                    return true;
                } else {
                    fundStatus.updateChild(fundStatusDto.isSubmit(), amount);
                }
            } else {
                fundStatus.updateParent(fundStatusDto.isAnswer());
            }
            updateStatus(fundStatus);
        }

        return false;
    }

    /**
     * 투자상태 생성
     * @param fundStatusDto 투자상태
     * @param fund 투자 정보
     */
    @Transactional
    public void insertStatus(FundStatusDto fundStatusDto, Fund fund) {
        FundStatus fundStatus = FundStatus.createFundStatus(fundStatusDto);
        fundStatus.setFund(fund);
        fundStatusRepository.save(fundStatus);
    }

    /**
     * 투자상태 업데이트
     * @param fundStatus 투자상태
     */
    @Transactional
    public void updateStatus(FundStatus fundStatus) {
        fundStatusRepository.save(fundStatus);
    }

    /**
     * 투자상태 전체 삭제
     */
    @Modifying
    @Transactional
    public void deleteAll() {
        em.createQuery("DELETE FROM FundStatus").executeUpdate();
    }

}
