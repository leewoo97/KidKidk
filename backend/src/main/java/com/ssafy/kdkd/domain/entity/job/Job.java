package com.ssafy.kdkd.domain.entity.job;

import com.ssafy.kdkd.domain.dto.job.JobReservationDto;
import com.ssafy.kdkd.domain.entity.user.Child;

import static jakarta.persistence.FetchType.LAZY;

import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.MapsId;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "job")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Job {

    @Id
    private Long id;

    @Embedded
    private JobInfo jobInfo;

    @Column(name = "done_count")
    private int doneCount;

    @MapsId
    @OneToOne(fetch = LAZY)
    @JoinColumn(name = "job_id")
    private Child child;

    /**
     * 연관관계 메서드
     */
    public void setChild(Child child) {
        this.child = child;
    }

    /**
     * 직업 생성
     */
    public static Job createJob(JobReservationDto jobReservationDto) {
        Job job = new Job();
        job.jobInfo = new JobInfo(jobReservationDto.getName(),
            jobReservationDto.getWage(),
            jobReservationDto.getTask(),
            jobReservationDto.getTaskAmount());
        return job;
    }

    /**
     * 직업 업데이트
     */
    public void updateJob(JobReservationDto jobReservationDto) {
        this.jobInfo = new JobInfo(jobReservationDto.getName(),
            jobReservationDto.getWage(),
            jobReservationDto.getTask(),
            jobReservationDto.getTaskAmount());
    }

    public void updateJob(int doneCount) {
        this.doneCount = doneCount;
    }
}
