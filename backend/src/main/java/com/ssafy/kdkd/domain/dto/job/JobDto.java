package com.ssafy.kdkd.domain.dto.job;

import com.ssafy.kdkd.domain.entity.job.Job;
import com.ssafy.kdkd.domain.entity.job.JobInfo;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class JobDto {

    private String name;

    private int wage;

    private String task;

    private int taskAmount;

    private int doneCount;

    private Long childId;

    public static JobDto mappingJobDto(Job job) {
        JobDto jobDto = new JobDto();
        JobInfo jobInfo = job.getJobInfo();
        jobDto.name = jobInfo.getName();
        jobDto.wage = jobInfo.getWage();
        jobDto.task = jobInfo.getTask();
        jobDto.taskAmount = jobInfo.getTaskAmount();
        jobDto.doneCount = job.getDoneCount();
        jobDto.childId = job.getId();
        return jobDto;
    }
}
