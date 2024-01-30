package com.ssafy.kdkd.config.schedule;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.ssafy.kdkd.service.saving.SavingService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@RequiredArgsConstructor
@Slf4j
public class ScheduleTasks {

    private final SavingService savingService;

    /**
     * 적금 자동 납부 스케줄러
     */
    @Scheduled(cron = "* * * * * ?")
    public void scheduleSaving() {
        log.info("schedule: scheduleSaving() Enter");
        try {
            savingService.updateSaving();
        } catch (Exception e) {
            log.info(e.toString());
        }
    }

}
