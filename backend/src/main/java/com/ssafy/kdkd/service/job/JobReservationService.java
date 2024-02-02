package com.ssafy.kdkd.service.job;

import com.ssafy.kdkd.domain.dto.job.JobReservationDto;
import com.ssafy.kdkd.domain.entity.job.Job;
import com.ssafy.kdkd.domain.entity.job.JobInfo;
import com.ssafy.kdkd.domain.entity.job.JobReservation;
import com.ssafy.kdkd.domain.entity.user.Child;
import com.ssafy.kdkd.repository.job.JobRepository;
import com.ssafy.kdkd.repository.job.JobReservationRepository;
import com.ssafy.kdkd.service.user.ChildService;

import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class JobReservationService {

    private final JobReservationRepository jobReservationRepository;
    private final JobRepository jobRepository;
    private final ChildService childService;

    /**
     * 직업예약 생성
     *
     * @param jobReservationDto 직업예약 정보
     * @param type 직업생성/직업예약생성 확인
     * @return JobReservationDto 생성된 직업예약
     */
    @Transactional
    public JobReservationDto createJobReservationDto(JobReservationDto jobReservationDto, boolean type) {
        Long childId = jobReservationDto.getChildId();
        Optional<JobReservation> findJobReservation = jobReservationRepository.findById(childId);

        if (findJobReservation.isPresent()) {
            return null;
        }

        if (type && jobRepository.existsById(childId)) {
            return null;
        }

        Optional<Child> findChild = childService.findChild(childId);

        if (findChild.isEmpty()) {
            return null;
        }

        Child child = findChild.get();
        jobReservationDto.setState(true);
        JobReservation reservation = JobReservation.createJobReservation(jobReservationDto);
        reservation.setChild(child);
        jobReservationRepository.save(reservation);
        return jobReservationDto;
    }

    /**
     * 직업예약 수정
     *
     * @param childId 자식 아이디
     * @param jobReservationDto 새로운 직업예약
     * @return JobReservationDto 생성된 직업예약
     */
    @Transactional
    public JobReservationDto modifyJobReservation(Long childId, JobReservationDto jobReservationDto) {
        Optional<JobReservation> existingJobReservation = jobReservationRepository.findById(childId);

        if (existingJobReservation.isEmpty()) {
            return null;
        }

        Optional<Child> findChild = childService.findChild(childId);

        if (findChild.isEmpty()) {
            return null;
        }

        Child child = findChild.get();
        JobReservation jobReservation = existingJobReservation.get();
        jobReservation.updateJobReservation(jobReservationDto);
        jobReservation.setChild(child);
        jobReservationRepository.save(jobReservation);
        return jobReservationDto;
    }

    /**
     * 직업 삭제 예약
     *
     * @param childId 자식 아이디
     * @return JobReservationDto 직업예약(삭제 예약된 상태 = state가 false)
     */
    @Transactional
    public JobReservationDto deleteJobReservation(Long childId) {
        Optional<Child> findChild = childService.findChild(childId);

        if (findChild.isEmpty()) {
            return null;
        }

        Child child = findChild.get();
        Optional<Job> job = jobRepository.findById(childId);

        if (job.isEmpty()) {
            return null;
        }

        Job existingJob = job.get();
        JobInfo jobInfo = existingJob.getJobInfo();
        JobReservationDto jobReservationDto =
            new JobReservationDto(
                jobInfo.getName(),
                jobInfo.getWage(),
                jobInfo.getTask(),
                jobInfo.getTaskAmount(),
                false,
                childId
            );
        JobReservation jobReservation = JobReservation.createJobReservation(jobReservationDto);
        jobReservation.setChild(child);
        jobReservationRepository.save(jobReservation);
        return jobReservationDto;
    }

    /**
     * 직업예약 삭제
     *
     * @param childId 자식 아이디
     * @return boolean 비어있는지 확인(true = 직업예약 X)
     */
    @Transactional
    public boolean delete(Long childId) {
        Optional<JobReservation> findJobReservation = jobReservationRepository.findById(childId);

        if (findJobReservation.isEmpty()) {
            return true;
        }

        jobReservationRepository.delete(findJobReservation.get());
        return false;
    }

}
