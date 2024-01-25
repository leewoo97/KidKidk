package com.ssafy.kdkd.domain.entity.job;

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
@Table(name = "job_reservation")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class JobReservation {

    @Id
    private Long id;

    @Embedded
    private JobInfo jobInfo;

    @Column(name = "state")
    private boolean state;

    @MapsId
    @OneToOne(fetch = LAZY)
    @JoinColumn(name = "job_reservation_id")
    private Child child;
}
