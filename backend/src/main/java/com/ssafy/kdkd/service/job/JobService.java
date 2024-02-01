package com.ssafy.kdkd.service.job;

import static com.ssafy.kdkd.domain.entity.deposit.Deposit.createDeposit;
import static com.ssafy.kdkd.domain.entity.job.Job.createJob;

import com.ssafy.kdkd.domain.dto.Deposit.DepositDto;
import com.ssafy.kdkd.domain.entity.deposit.Deposit;
import com.ssafy.kdkd.domain.entity.job.Job;
import com.ssafy.kdkd.domain.entity.job.JobInfo;
import com.ssafy.kdkd.domain.entity.job.JobReservation;
import com.ssafy.kdkd.domain.entity.user.Child;
import com.ssafy.kdkd.repository.Deposit.DepositRepository;
import com.ssafy.kdkd.repository.job.JobRepository;
import com.ssafy.kdkd.repository.job.JobReservationRepository;
import com.ssafy.kdkd.service.user.ChildService;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class JobService {

    private final JobRepository jobRepository;
    private final JobReservationRepository jobReservationRepository;
    private final ChildService childService;
    private final DepositRepository depositRepository;

    public void save(Job job) {
        jobRepository.save(job);
    }
fg
    public Optional<Job> findById(Long childId) {
        return jobRepository.findById(childId);
    }

    @Transactional
    public void delete(Job job) {
        jobRepository.delete(job);
    }

    @Transactional
    public void deleteById(Long childId) {
        jobRepository.deleteById(childId);
    }

    /**
     * 직업예약 -> 직업 생성
     * 
     * @param jobReservation 직업예약
     */
    @Transactional
    public void insertJob(JobReservation jobReservation) {
        Child child = childService.findChild(jobReservation.getId()).get();
        Job job = createJob(jobReservation);
        job.setChild(child);
        save(job);
    }

    /**
     * 직업 스케줄러
     *
     * 상세:
     * 1. 급여 지급
     * 2. 직업예약 정보 반영
     */
    @Transactional
    public void updateJob() {
        // 직업 목록 조회
        List<Job> jobList = jobRepository.findAll();

        for (Job job : jobList) {
            // 급여 지급
            Long childId = job.getId();
            Child child = childService.findChild(childId).get();
            JobInfo jobInfo = job.getJobInfo();
            int doneCount = job.getDoneCount();
            int taskAmount = jobInfo.getTaskAmount();
            int wage = jobInfo.getWage();
            int updateCoin = child.getCoin() + wage;
            boolean isDone = doneCount >= taskAmount;

            // doneCount 체크
            if (isDone) {
                // child 업데이트(급여 지급)
                child.updateChild(updateCoin);

                // deposit 업데이트(급여 지급)
                String detail = "급여";
                boolean type = true;
                DepositDto depositDto = new DepositDto(LocalDateTime.now(), detail, type, wage, updateCoin, childId);
                Deposit deposit = createDeposit(depositDto);
                deposit.setChild(child);
                depositRepository.save(deposit);
            }

            // doneCount 초기화(0)
            job.updateJob(0);
            jobRepository.save(job);
        }

        // job에 job_reservation 반영
        List<JobReservation> jobReservationList = jobReservationRepository.findAll();

        for (JobReservation jobReservation : jobReservationList) {
            Long childId = jobReservation.getId();
            Child child = childService.findChild(childId).get();
            boolean state = jobReservation.isState();

            if (state) {
                Optional<Job> existingJob = findById(childId);

                if (existingJob.isPresent()) {
                    Job job = existingJob.get();
                    job.updateJob(jobReservation);
                    job.setChild(child);
                    jobRepository.save(job);
                } else {
                    Job job = createJob(jobReservation);
                    job.setChild(child);
                    jobRepository.save(job);
                }
            } else {
                deleteById(childId);
            }
        }

        // job_reservation 전체 삭제
        jobReservationRepository.deleteAll();
    }

}
