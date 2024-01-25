package com.ssafy.kdkd.domain.entity.fund;

import com.ssafy.kdkd.domain.entity.user.Child;

import static jakarta.persistence.FetchType.LAZY;

import jakarta.persistence.Column;
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
@Table(name = "fund_reservation")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class FundReservation {

    @Id
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "content")
    private String content;

    @Column(name = "yield")
    private int yield;

    @Column(name = "state")
    private boolean state;

    @MapsId
    @OneToOne(fetch = LAZY)
    @JoinColumn(name = "fund_reservation_id")
    private Child child;
}
