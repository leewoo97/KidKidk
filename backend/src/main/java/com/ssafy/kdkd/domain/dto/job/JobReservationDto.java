package com.ssafy.kdkd.domain.dto.job;

import lombok.Data;

@Data
public class JobReservationDto {

    private String name;

    private int wage;

    private String task;

    private int taskAmount;

    private boolean state;

    private Long childId;

    public JobReservationDto(String name, int wage, String task, int taskAmount, boolean state, Long childId) {
        this.name = name;
        this.wage = wage;
        this.task = task;
        this.taskAmount = taskAmount;
        this.state = state;
        this.childId = childId;
    }
}
