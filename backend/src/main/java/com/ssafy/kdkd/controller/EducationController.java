package com.ssafy.kdkd.controller;

import com.ssafy.kdkd.domain.entity.education.Education;
import com.ssafy.kdkd.service.education.EducationService;

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
public class EducationController {

    private final EducationService educationService;

    @GetMapping("/education")
    public ResponseEntity<?> list() {
        try {
            List<Education> result = educationService.findAll();
            HttpHeaders header = new HttpHeaders();
            header.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
            System.out.println("=== education ===");
            for (Education education : result) {
                System.out.println(education.getCategory());
            }
            System.out.println("=== education ===");
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
