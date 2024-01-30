package com.ssafy.kdkd.service.job;

import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.kdkd.domain.entity.job.JobReservation;
import com.ssafy.kdkd.repository.job.JobReservationRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class JobReservationService {

    private final JobReservationRepository jobReservationRepository;

    public void save(JobReservation jobReservation) {
        jobReservationRepository.save(jobReservation);
    }

    public Optional<JobReservation> findById(Long childId) {
        return jobReservationRepository.findById(childId);
    }

    public void delete(JobReservation jobReservation) {
        jobReservationRepository.delete(jobReservation);
    }

}
