package com.ssafy.kdkd.controller;

import com.ssafy.kdkd.domain.entity.quiz.Quiz;
import com.ssafy.kdkd.service.quiz.QuizService;

import java.nio.charset.Charset;
import java.util.List;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class QuizController {

    private final QuizService quizService;

    @GetMapping("/quiz")
    public ResponseEntity<?> list() {
        try {
            List<Quiz> result = quizService.findAll();
            HttpHeaders header = new HttpHeaders();
            header.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
            System.out.println("=== quiz ===");
            for (Quiz quiz : result) {
                System.out.println(quiz.getCategory());
            }
            System.out.println("=== quiz ===");
            return ResponseEntity.ok().headers(header).body(result);
        } catch (Exception e) {
            return exceptionHandling(e);
        }
    }

    private ResponseEntity<String> exceptionHandling(Exception e) {
        e.printStackTrace();
        return new ResponseEntity<String>("Error : " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
