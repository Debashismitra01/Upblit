package com.upblit.backend.Controller;
import com.upblit.backend.Service.ApiKeyGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/apikey")
public class ApiKeyController {
    @Autowired
    private ApiKeyGenerator apiKeyGenerator;
    @PostMapping
    public String ApiKey(@RequestParam Long ApplicationId) {
        return  apiKeyGenerator.generateApiKey(ApplicationId);
    }
}
