package com.ssafy.kdkd.service.saving;

import com.ssafy.kdkd.domain.entity.saving.Saving;
import com.ssafy.kdkd.domain.entity.saving.SavingHistory;
import com.ssafy.kdkd.repository.saving.SavingHistoryRepository;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class SavingHistoryService {

    private final SavingService savingService;
    private final SavingHistoryRepository savingHistoryRepository;

    public void save(SavingHistory savingHistory) {
        savingHistoryRepository.save(savingHistory);
    }

    /**
     * 적금내역 목록 조회
     *
     * @param childId 자식 아이디
     * @return List<SavingHistory> 적금 내역 목록 조회
     */
    public List<SavingHistory> findSavingHistoriesByChildId(Long childId) {
        Optional<Saving> saving = savingService.findById(childId);

        if (saving.isEmpty()) {
            return null;
        }
        return savingHistoryRepository.findSavingHistoriesByChildId(childId);
    }

}
