package com.ssafy.kdkd.domain.entity.job;

import java.util.Objects;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

@Embeddable
public class JobInfo {

    @Column(name = "name")
    private String name;

    @Column(name = "wage")
    private int wage;

    @Column(name = "task")
    private String task;

    @Column(name = "task_amount")
    private int taskAmount;

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;
        JobInfo jobInfo = (JobInfo)o;
        return wage == jobInfo.wage && taskAmount == jobInfo.taskAmount && Objects.equals(name, jobInfo.name)
            && Objects.equals(task, jobInfo.task);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, wage, task, taskAmount);
    }
}
