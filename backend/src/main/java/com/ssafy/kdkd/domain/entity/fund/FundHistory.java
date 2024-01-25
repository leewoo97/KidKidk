package com.ssafy.kdkd.domain.entity.fund;

import com.ssafy.kdkd.domain.entity.user.Child;

import static jakarta.persistence.FetchType.LAZY;

import java.time.LocalDateTime;

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
@Table(name = "fund_history")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class FundHistory {

    @Id
    private Long id;

    @Column(name = "data_log")
    private LocalDateTime dataLog;

    @Column(name = "seed_money")
    private int seedMoney;

    @Column(name = "yield")
    private int yield;

    @Column(name = "pnl")
    private int pnl;

    @MapsId
    @OneToOne(fetch = LAZY)
    @JoinColumn(name = "fund_history_id")
    private Child child;
}
