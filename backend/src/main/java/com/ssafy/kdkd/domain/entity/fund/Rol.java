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
@Table(name = "rol")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Rol {

    @Id
    private Long id;

    @Column(name = "success")
    private int success;

    @Column(name = "fail")
    private int fail;

    @MapsId
    @OneToOne(fetch = LAZY)
    @JoinColumn(name = "rol_id")
    private Child child;
}
