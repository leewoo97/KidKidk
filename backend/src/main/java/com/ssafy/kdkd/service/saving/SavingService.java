package com.ssafy.kdkd.service.saving;

import static com.ssafy.kdkd.domain.entity.deposit.Deposit.createDeposit;
import static com.ssafy.kdkd.domain.entity.saving.SavingHistory.createSavingHistory;

import com.ssafy.kdkd.domain.dto.Deposit.DepositDto;
import com.ssafy.kdkd.domain.dto.saving.SavingDto;
import com.ssafy.kdkd.domain.dto.saving.SavingHistoryDto;
import com.ssafy.kdkd.domain.entity.deposit.Deposit;
import com.ssafy.kdkd.domain.entity.saving.Saving;
import com.ssafy.kdkd.domain.entity.saving.SavingHistory;
import com.ssafy.kdkd.domain.entity.user.Child;
import com.ssafy.kdkd.repository.Deposit.DepositRepository;
import com.ssafy.kdkd.repository.saving.SavingHistoryRepository;
import com.ssafy.kdkd.repository.saving.SavingRepository;
import com.ssafy.kdkd.service.user.ChildService;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
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
public class SavingService {

    private final SavingRepository savingRepository;
    private final SavingHistoryRepository savingHistoryRepository;
    private final DepositRepository depositRepository;
    private final ChildService childService;

    public void save(Saving saving) {
        savingRepository.save(saving);
    }

    public Optional<Saving> findById(Long childId) {
        return savingRepository.findById(childId);
    }

    @Transactional
    public void delete(Saving saving) {
        savingRepository.delete(saving);
    }

    /**
     * 적금 생성
     * 
     * @param savingDto 적금생성을 위한 입력값
     * @return SavingDto 생성된 적금정보
     */
    @Transactional
    public SavingDto createSaving(SavingDto savingDto) {
        Long childId = savingDto.getChildId();
        Optional<Child> findChild = childService.findChild(childId);

        if (findChild.isEmpty()) {
            return null;
        }

        Child child = findChild.get();
        Optional<Saving> existingSaving = savingRepository.findById(childId);

        if (existingSaving.isPresent()) {
            return null;
        }

        int count = 4;
        int rate = 5;
        SavingDto setSavingDto = new SavingDto(LocalDateTime.now(), count, savingDto.getPayment(), rate, childId);
        Saving saving = Saving.createSaving(setSavingDto);
        saving.setChild(child);
        savingRepository.save(saving);
        return setSavingDto;
    }

    /**
     * 적금 스케줄러
     * 상세:
     * 1. 적금 납입
     * 2. 적금 만기 해지, 중도 해지 업데이트
     * 3. deposit에 내역 업데이트
     */
    @Transactional
    public void updateSaving() {
        // saving 전체 조회
        List<Saving> list = savingRepository.findAll();

        for (Saving saving : list) {
            // 등록일로 부터 7 * N일이 지난 saving 레코드를 조회
            LocalDateTime startDate = saving.getStartDate();
            LocalDateTime currentDate = LocalDateTime.now();
            long daysBetween = ChronoUnit.DAYS.between(startDate, currentDate) - 1;

            if (daysBetween % 7 <= 0) {
                //  남은 납입 횟수, 남은 납입 기회 확인
                Long childId = saving.getId();
                Optional<Child> findChild = childService.findChild(childId);

                if (findChild.isEmpty()) {
                    log.info("적금 스케줄러 실패");
                    return;
                }

                Child child = findChild.get();
                int requiredCount = 4;
                int payment = saving.getPayment();
                int coin = child.getCoin();
                int left = requiredCount - ((int)daysBetween / 7 + 1);
                int isOk = coin >= payment ? 1 : 0;
                int count = saving.getCount() - isOk;
                int payCount = requiredCount - count;
                int state = left + payCount;
                boolean isNotExpired = state > 2 && isOk == 1;
                int updateCoin = coin;
                int money = payment;
                String detail = "적금";
                boolean type = true;

                // 적금 납입
                if (left > 0 && isNotExpired) {
                    // 남은 납입 횟수 업데이트
                    saving.updateSaving(count);

                    updateCoin -= payment;
                    detail += " 납입";
                    SavingHistoryDto savingHistoryDto = new SavingHistoryDto(LocalDateTime.now(), detail, type, payment, childId);
                    SavingHistory savingHistory = createSavingHistory(savingHistoryDto);
                    savingHistory.setChild(child);
                    savingHistoryRepository.save(savingHistory);
                    type = false;
                } else {
                    // 적금 만료(납입액에 이자 적용된 금액만큼 지급)
                    if (isNotExpired) {
                        double rate = (100D + saving.getRate()) / 100;
                        int amount = payCount * saving.getPayment();
                        money = (int)Math.floor(amount * rate);

                        updateCoin -= payment;
                        DepositDto depositDto = new DepositDto(LocalDateTime.now(), detail + " 납입", false, payment, updateCoin, childId);
                        Deposit deposit = createDeposit(depositDto);
                        deposit.setChild(child);
                        depositRepository.save(deposit);
                        updateCoin += money;
                        detail += " 만기";
                    } else {
                        // 적금 강제 해지
                        money = payCount * payment;
                        updateCoin += money;
                        detail += " 해지";
                    }

                    // 적금 강제 해지(납입 횟수 미납) or 적금 만료 해지(만기일)
                    delete(saving);
                    savingHistoryRepository.deleteSavingHistoryByChhildId(childId);
                }

                // coin 업데이트
                child.updateChild(updateCoin);

                // deposit
                DepositDto depositDto = new DepositDto(LocalDateTime.now(), detail, type, money, updateCoin, childId);
                Deposit deposit = createDeposit(depositDto);
                deposit.setChild(child);
                depositRepository.save(deposit);
            }
        }
    }
}
