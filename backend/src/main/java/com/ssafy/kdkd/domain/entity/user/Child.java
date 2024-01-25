package com.ssafy.kdkd.domain.entity.user;

import com.ssafy.kdkd.domain.entity.account.Profile;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.PrimaryKeyJoinColumn;
import jakarta.persistence.Table;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "child")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@PrimaryKeyJoinColumn(name = "profile_id")
public class Child extends Profile {

    @Id
    @GeneratedValue
    @Column(name = "id")
    private Long id;

    @Column(name = "coin")
    private int coin;

    @Column(name = "fund_money")
    private int fundMoney;
}
