package com.ssafy.kdkd.service.saving;

import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.kdkd.domain.entity.saving.Saving;
import com.ssafy.kdkd.repository.saving.SavingRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class SavingService {

    private final SavingRepository savingRepository;

    public void save(Saving saving) {
        savingRepository.save(saving);
    }

    public Optional<Saving> findById(Long childId) {
        return savingRepository.findById(childId);
    }

    public void delete(Saving saving) {
        savingRepository.delete(saving);
    }
}
