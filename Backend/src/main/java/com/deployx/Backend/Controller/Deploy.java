package com.deployx.Backend.Controller;

import com.deployx.Backend.DTO.DeployDTO;
import com.deployx.Backend.Service.DeployService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/deployx")
public class Deploy {

    @Autowired
    private DeployService deployService;

    @PostMapping
    public ResponseEntity<?> deployProject(@RequestBody DeployDTO deployDTO) {
        return deployService.deploy(deployDTO);
    }

    @DeleteMapping
    public ResponseEntity<?> deleteProject(@RequestBody String name){
        return deployService.delete(name);
    }
}
