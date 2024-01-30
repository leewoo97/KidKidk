package com.ssafy.kdkd.service.job;

import java.util.Optional;

import com.ssafy.kdkd.domain.entity.job.Job;
import com.ssafy.kdkd.repository.job.JobRepository;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class JobService {

    private final JobRepository jobRepository;

    public void save(Job job) {
        jobRepository.save(job);
    }

    public Optional<Job> findById(Long childId) {
        return jobRepository.findById(childId);
    }

    public void delete(Job job) {
        jobRepository.delete(job);
    }

}
