package com.deployx.Backend.Controller;

import com.deployx.Backend.Service.RepoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/")
public class RepoController {

    @Autowired
    private RepoService repoService;

    @GetMapping("/repos")
    public ResponseEntity<?> getOwnRepos() {
        return repoService.getrepo();
    }
}
