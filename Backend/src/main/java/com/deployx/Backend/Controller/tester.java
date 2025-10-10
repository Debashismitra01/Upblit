package com.deployx.Backend.Controller;

import com.deployx.Backend.Model.User;

import com.deployx.Backend.Service.TesterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/tester")
public class tester {
    @Autowired
    private TesterService testerService;

    @GetMapping
    public ResponseEntity<String> getname() {
    return ResponseEntity.ok(testerService.getUser().getAccessToken());
    }
}
