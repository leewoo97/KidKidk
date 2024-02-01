package com.ssafy.kdkd.repository.user;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.kdkd.domain.entity.user.Child;

public interface ChildRepository extends JpaRepository<Child, Long> {

}
