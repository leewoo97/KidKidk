package com.ssafy.kdkd.service.job;

import com.ssafy.kdkd.domain.entity.job.Job;
import com.ssafy.kdkd.domain.entity.job.JobReservation;
import com.ssafy.kdkd.domain.entity.user.Child;
import com.ssafy.kdkd.repository.job.JobRepository;
import com.ssafy.kdkd.service.user.ChildService;

import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class JobService {

    private final JobRepository jobRepository;
    private final ChildService childService;

    public void save(Job job) {
        jobRepository.save(job);
    }

    public Optional<Job> findById(Long childId) {
        return jobRepository.findById(childId);
    }

    @Transactional
    public void delete(Job job) {
        jobRepository.delete(job);
    }

    /**
     * 직업예약 -> 직업 생성
     * 
     * @param jobReservation 직업예약
     */
    @Transactional
    public void insertJob(JobReservation jobReservation) {
        Child child = childService.findChild(jobReservation.getId()).get();
        Job job = Job.createJob(jobReservation);
        job.setChild(child);
        save(job);
    }

    /**
     * 직업 스케줄러
     *
     */
    @Transactional
    public void updateJob() {

    }

}
