package com.ssafy.kdkd.service.saving;

import com.ssafy.kdkd.domain.entity.saving.SavingHistory;
import com.ssafy.kdkd.repository.saving.SavingHistoryRepository;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class SavingHistoryService {

    private final SavingHistoryRepository savingHistoryRepository;

    public void save(SavingHistory savingHistory) {
        savingHistoryRepository.save(savingHistory);
    }

    public List<SavingHistory> findSavingHistoriesByChild_Id(Long childId) {
        return savingHistoryRepository.findSavingHistoriesByChild_Id(childId);
    }

}
