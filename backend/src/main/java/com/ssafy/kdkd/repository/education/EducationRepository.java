package com.ssafy.kdkd.repository.education;

import com.ssafy.kdkd.domain.entity.education.Education;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface EducationRepository extends JpaRepository<Education, Long> {

    List<Education> findAll();

}
