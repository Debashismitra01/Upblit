package com.upblit.backend.Service;

import com.upblit.backend.Models.ApiClient;
import com.upblit.backend.Models.Applications;
import com.upblit.backend.Models.User;
import com.upblit.backend.Repository.ApiClientRepository;
import com.upblit.backend.Repository.ApplicationsRepository;
import com.upblit.backend.Repository.ProjectRepository;
import com.upblit.backend.Repository.UserRepository;
import com.upblit.backend.Security.UserdataUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import java.security.SecureRandom;
import java.util.Base64;

@Service
public class ApiKeyGenerator {

    private static final SecureRandom secureRandom = new SecureRandom();
    private static final Base64.Encoder encoder =
            Base64.getUrlEncoder().withoutPadding();

    @Autowired
    private ApplicationsRepository applicationsRepository;
    @Autowired
    private ProjectRepository projectRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ApiClientRepository apiClientRepository;

    public String generateApiKey(@RequestParam Long ApplicationId) {
        Applications applications = applicationsRepository.findById(ApplicationId).orElse(null);
        User user = userRepository.findByUsername(UserdataUtil.getCurrentUsername()).orElse(null);
        if (projectRepository.findByIdAndOwner(applications.getProject().getId(),user).isPresent()) {
            String ApiToken= generate();
            ApiClient apiClient = new ApiClient();
            apiClient.setApiKey(ApiToken);
            apiClient.setApplicationId(ApplicationId);
            apiClient.setProjectId(applications.getProject().getId());
            apiClientRepository.save(apiClient);
            return "upblit_"+ApiToken;
        }
        else return null;
    }
    public static String generate() {
        byte[] bytes = new byte[32]; // 256-bit entropy
        secureRandom.nextBytes(bytes);

        return encoder.encodeToString(bytes);
    }
}
