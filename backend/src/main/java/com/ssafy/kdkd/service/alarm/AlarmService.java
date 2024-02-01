package com.ssafy.kdkd.service.alarm;

import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.kdkd.domain.dto.Alarm.AlarmDto;
import com.ssafy.kdkd.domain.entity.job.Job;
import com.ssafy.kdkd.domain.entity.user.Child;
import com.ssafy.kdkd.repository.job.JobRepository;
import com.ssafy.kdkd.service.user.ChildService;

import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class AlarmService {

    private final JobRepository jobRepository;
    private final ChildService childService;

    @Transactional
    public void confirmTask(AlarmDto alarmDto) {
        Long childId = alarmDto.getReceiverId();
        Child child = childService.findChild(childId).get();
        Job job = jobRepository.findById(childId).get();
        int updateDoneCount = job.getDoneCount() + 1;
        job.updateJob(updateDoneCount);
        job.setChild(child);
        jobRepository.save(job);
    }

}
