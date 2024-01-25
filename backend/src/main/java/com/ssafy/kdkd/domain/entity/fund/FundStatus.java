package com.ssafy.kdkd.domain.entity.fund;

import static jakarta.persistence.FetchType.LAZY;

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
@Table(name = "fund_status")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class FundStatus {

    @Id
    @GeneratedValue
    @Column(name = "id")
    private Long id;

    @Column(name = "submit")
    private boolean submit;

    @Column(name = "answer")
    private boolean answer;

    @OneToOne(fetch = LAZY)
    @JoinColumn(name = "fund_id")
    private Fund fund;
}
