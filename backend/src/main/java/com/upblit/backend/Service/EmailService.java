package com.upblit.backend.Service;

import com.upblit.backend.DTO.EmailDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.client.RestTemplate;

@Service
public class EmailService {
    @Autowired
    private RestTemplate restTemplate;

    @Value("${email.uri}")
    private String email_uri;

    @Value("${email.secret}")
    private String email_secret;

    public String test(@RequestBody EmailDTO emailDTO) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("email-api-key", email_secret);
        HttpEntity<EmailDTO> requestEntity =
                new HttpEntity<>(emailDTO, headers);
        return restTemplate.postForObject(email_uri, requestEntity, String.class);
    }
}
