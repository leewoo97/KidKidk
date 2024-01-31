package com.ssafy.kdkd.domain.entity.fund;

import static jakarta.persistence.FetchType.LAZY;

import com.ssafy.kdkd.domain.dto.fund.FundStatusDto;

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
@Table(name = "fund_status")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class FundStatus {

    @Id
    private Long id;

    @Column(name = "submit")
    private boolean submit;

    @Column(name = "answer")
    private boolean answer;

    @MapsId
    @OneToOne(fetch = LAZY)
    @JoinColumn(name = "fund_status_id")
    private Fund fund;

    /**
     * 연관관계 메서드
     */
    public void setFund(Fund fund) {
        this.fund = fund;
    }

    /**
     * 투자상태 생성
     */
    public static FundStatus createFundStatus(FundStatusDto fundStatusDto) {
        FundStatus fundStatus = new FundStatus();
        fundStatus.submit = fundStatusDto.isSubmit();
        fundStatus.answer = fundStatusDto.isAnswer();
        return fundStatus;
    }

    public void updateParent(boolean answer) {
        this.answer = answer;
    }

    public void updateChild(boolean submit) {
        this.submit = submit;
    }

}
