package com.ssafy.kdkd.security.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class authController {
    @GetMapping("/api/auth")
    public String myPage() {

        return "my";
    }
}
