package com.ssafy.kdkd.domain.entity.account;

import com.ssafy.kdkd.domain.entity.user.Child;
import com.ssafy.kdkd.domain.entity.user.Parent;

import static jakarta.persistence.FetchType.LAZY;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "profile")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Profile {

    @Id
    @GeneratedValue
    @Column(name = "profile_id")
    private Long id;

    @Column(name = "nickname")
    private String nickname;

    @Column(name = "pin")
    private int pin;

    @Lob
    @Column(name = "profile_image")
    private String profileImage;

    @Column(name = "type")
    private boolean type;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @OneToOne(mappedBy = "profile", fetch = LAZY)
    private Child child;

    @OneToOne(mappedBy = "profile", fetch = LAZY)
    private Parent parent;
}
