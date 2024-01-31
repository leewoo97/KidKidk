package com.ssafy.kdkd.domain.dto.job;

import com.ssafy.kdkd.domain.entity.job.JobInfo;
import com.ssafy.kdkd.domain.entity.job.JobReservation;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class JobReservationDto {

    private String name;

    private int wage;

    private String task;

    private int taskAmount;

    private boolean state;

    private Long childId;

    public static JobReservationDto mappingJobReservationDto(JobReservation jobReservation) {
        JobReservationDto jobReservationDto = new JobReservationDto();
        JobInfo jobInfo = jobReservation.getJobInfo();
        jobReservationDto.name = jobInfo.getName();
        jobReservationDto.wage = jobInfo.getWage();
        jobReservationDto.task = jobInfo.getTask();
        jobReservationDto.taskAmount = jobInfo.getTaskAmount();
        jobReservationDto.state = jobReservation.isState();
        jobReservationDto.childId = jobReservation.getId();
        return jobReservationDto;
    }

}
