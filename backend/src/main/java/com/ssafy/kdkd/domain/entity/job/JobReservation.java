package com.ssafy.kdkd.domain.entity.job;

import com.ssafy.kdkd.domain.entity.user.Child;

import static jakarta.persistence.FetchType.LAZY;

import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "job_reservation")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class JobReservation {

    @Id
    @GeneratedValue
    @Column(name = "id")
    private Long id;

    @Embedded
    private JobInfo jobInfo;

    @Column(name = "state")
    private boolean state;

    @OneToOne(fetch = LAZY)
    @JoinColumn(name = "child_id")
    private Child child;
}
