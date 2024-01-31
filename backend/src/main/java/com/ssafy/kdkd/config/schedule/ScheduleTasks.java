package com.ssafy.kdkd.config.schedule;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.ssafy.kdkd.service.fund.FundService;
import com.ssafy.kdkd.service.saving.SavingService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@RequiredArgsConstructor
@Slf4j
public class ScheduleTasks {

    private final SavingService savingService;
    private final FundService fundService;

    /**
     * 직업 스케줄러
     * 상세: 매주 월요일 오전 09시
     */
    @Scheduled(cron = "0 0 9 * * MON")
    public void scheduleJob() {
        log.info("schedule: scheduleFund() Enter");
        try {

        } catch (Exception e) {

        }
    }

    /**
     * 투자 스케줄러
     * 상세: 매일 오전 09시
     */
    @Scheduled(cron = "0 0 9 * * *")
    public void scheduleFund() {
        log.info("schedule: scheduleFund() Enter");
        try {
            fundService.updateFund();
        } catch (Exception e) {
            log.info(e.toString());
        }
    }

    /**
     * 적금 스케줄러
     * 상세: 매일 오전 09시
     */
    @Scheduled(cron = "0 0 9 * * *")
    public void scheduleSaving() {
        log.info("schedule: scheduleSaving() Enter");
        try {
            savingService.updateSaving();
        } catch (Exception e) {
            log.info(e.toString());
        }
    }
}

