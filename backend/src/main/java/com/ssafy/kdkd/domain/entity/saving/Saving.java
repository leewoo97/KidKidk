package com.ssafy.kdkd.domain.entity.saving;

import com.ssafy.kdkd.domain.entity.user.Child;

import static jakarta.persistence.FetchType.LAZY;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
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
@Table(name = "saving")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Saving {

    @Id
    @GeneratedValue
    @Column(name = "id")
    private Long id;

    @Column(name = "start_date")
    private LocalDateTime startDate;

    @Column(name = "count")
    private int count;

    @Column(name = "payment")
    private int payment;

    @Column(name = "rate")
    private int rate;

    @OneToOne(fetch = LAZY)
    @JoinColumn(name = "child_id")
    private Child child;
}
