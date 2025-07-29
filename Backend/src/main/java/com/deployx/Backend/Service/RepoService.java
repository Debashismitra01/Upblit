package com.deployx.Backend.Service;

import com.deployx.Backend.Model.User;
import com.deployx.Backend.Repository.UserRepository;
import com.deployx.Backend.Security.UserdataUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class RepoService {
    @Autowired
    private UserRepository userRepository;

    public ResponseEntity<?> getrepo(){

        User user=userRepository.findByUsername(UserdataUtil.getCurrentUsername()).orElse(null);
        String token = user.getAccessToken();
        String url = "https://api.github.com/user/repos?affiliation=owner"; // only repos owned by user

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(token);
        headers.setAccept(List.of(MediaType.APPLICATION_JSON));

        HttpEntity<Void> entity = new HttpEntity<>(headers);

        // GitHub call
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<List> response = restTemplate.exchange(url, HttpMethod.GET, entity, List.class);

        // Extract and map name + clone_url only
        List<Map<String, Object>> fullRepoList = response.getBody();

        List<Map<String, String>> simplified = fullRepoList.stream()
                .map(repo -> {
                    Map<String, String> minimal = new HashMap<>();
                    minimal.put("name", (String) repo.get("name"));
                    minimal.put("clone_url", (String) repo.get("clone_url"));
                    minimal.put("private", String.valueOf(repo.get("private")));
                    return minimal;
                })
                .collect(Collectors.toList());

        return ResponseEntity.ok(simplified);
    }
}
