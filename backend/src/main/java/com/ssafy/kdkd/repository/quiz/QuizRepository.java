package com.ssafy.kdkd.repository.quiz;

import com.ssafy.kdkd.domain.entity.quiz.Quiz;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface QuizRepository extends JpaRepository<Quiz, Long> {

    @Query(value = "SELECT * FROM quiz order by RAND() limit 2", nativeQuery = true)
    List<Quiz> findAll();

}
