package com.ssafy.kdkd.service.saving;

import static com.ssafy.kdkd.domain.entity.saving.Saving.createSaving;

import com.ssafy.kdkd.domain.dto.saving.SavingDto;
import com.ssafy.kdkd.domain.entity.saving.Saving;
import com.ssafy.kdkd.repository.saving.SavingRepository;
import com.ssafy.kdkd.service.user.ChildService;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class SavingService {

    private final SavingRepository savingRepository;
    private final ChildService childService;

    public void save(Saving saving) {
        savingRepository.save(saving);
    }

    public Optional<Saving> findById(Long childId) {
        return savingRepository.findById(childId);
    }

    public void delete(Saving saving) {
        savingRepository.delete(saving);
    }

    @Transactional
    public SavingDto insertSaving(SavingDto savingDto) {
        SavingDto setSavingDto = new SavingDto(LocalDateTime.now(), 4, savingDto.getPayment(), 5, savingDto.getChildId());
        Saving saving = createSaving(setSavingDto);
        saving.setChild(childService.findChild(savingDto.getChildId()).get());
        savingRepository.save(saving);
        return setSavingDto;
    }
}
