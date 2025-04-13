package com.example.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/api")
public class HomeController {
	@GetMapping("/")
    private String index(){
        return "redirect:/swagger-ui/index.html";
    }
    @GetMapping("/hello")
    private String heelo(){
        return "helo";
    }
}
