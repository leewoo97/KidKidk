package com.ssafy.kdkd.repository;

import java.util.Optional;

import com.ssafy.kdkd.domain.entity.user.Child;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ChildRepository extends JpaRepository<Child, Long> {

    Optional<Child> findById(Long id);

}
