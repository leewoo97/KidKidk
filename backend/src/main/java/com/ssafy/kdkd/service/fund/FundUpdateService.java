package com.ssafy.kdkd.service.fund;

import static com.ssafy.kdkd.domain.entity.fund.FundHistory.createFundHistory;

import com.ssafy.kdkd.domain.dto.fund.FundHistoryDto;
import com.ssafy.kdkd.domain.dto.fund.RoiDto;
import com.ssafy.kdkd.domain.entity.fund.Fund;
import com.ssafy.kdkd.domain.entity.fund.FundHistory;
import com.ssafy.kdkd.domain.entity.fund.FundReservation;
import com.ssafy.kdkd.domain.entity.fund.FundStatus;
import com.ssafy.kdkd.domain.entity.fund.Roi;
import com.ssafy.kdkd.domain.entity.user.Child;
import com.ssafy.kdkd.service.user.ChildService;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
@Slf4j
public class FundUpdateService {

    private final FundService fundService;
    private final FundStatusService fundStatusService;
    private final FundReservationService fundReservationService;
    private final FundHistoryService fundHistoryService;
    private final RoiService roiService;
    private final ChildService childService;

    /**
     * 투자 스케줄러
     * 상세:
     * 1. 투자의 성공, 실패여부 반영
     * 2. 투자예약 정보 반영
     */
    @Transactional
    public void updateFund() {
        // fund_status 조회
        List<FundStatus> list = fundStatusService.findAll();

        for (FundStatus fundStatus : list) {
            // 투자 결과 업데이트
            Fund fund = fundStatus.getFund();
            Optional<Child> findChild = childService.findChild(fund.getId());

            if (findChild.isEmpty()) {
                log.info("투자 스케줄러 실패");
                return;
            }

            Child child = findChild.get();

            Long childId = child.getId();
            int amount = fundStatus.getAmount();
            boolean answer = fundStatus.isAnswer();
            boolean submit = fundStatus.isSubmit();
            boolean isSuccess = answer == submit;
            int yield = fund.getYield();
            int sign = isSuccess ? 1 : -1;
            int add = isSuccess ? 1 : 0;
            double rate = (100D + sign * yield) / 100;
            int fundMoney = child.getFundMoney() - amount;
            int pnl = (int)Math.floor(amount * rate);
            int updateFundMoney = fundMoney + pnl;
            Optional<Roi> roi = roiService.findById(childId);

            // 투자계좌 결과 반영
            child.updateFundMoney(updateFundMoney);
            // fund_history 업데이트
            FundHistory fundHistory =
                createFundHistory(new FundHistoryDto(
                    LocalDateTime.now(),
                    amount,
                    yield,
                    pnl,
                    childId
                ));
            fundHistoryService.save(fundHistory);
            // roi 업데이트
            if (roi.isEmpty()) {
                roiService.createRoi(new RoiDto(add, 1, childId));
            } else {
                Roi existingRoi = roi.get();
                roiService.updateRoi(existingRoi, new RoiDto(existingRoi.getSuccess() + add, existingRoi.getCount() + 1, childId));
            }
        }
        // fund_status 전체 삭제
        fundStatusService.deleteAll();

        // fund에 fund_reservation 반영
        List<FundReservation> reservationList = fundReservationService.findAll();
        for (FundReservation fundReservation : reservationList) {
            boolean isUpdate = fundReservation.isState();

            if (isUpdate) {
                fundService.insertFund(fundReservation);
            } else {
                fundService.deleteById(fundReservation.getId());
            }
        }
        // fund_reservation 전체 삭제
        fundReservationService.deleteAll();
    }

}
