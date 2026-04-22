package com.upblit.backend.ai.docs;

import com.upblit.backend.email.EmailDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.client.RestTemplate;

@Service
public class DocsSender {

    @Autowired
    private RestTemplate restTemplate;
    private String fast_api_key="http://localhost8000";
    private String fast_api_uri="http://localhost:8000";
    public String docs_send( DocsTransferDTO docsTransferDTO) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("X-API-KEY", fast_api_key);
        HttpEntity<DocsTransferDTO> requestEntity =
                new HttpEntity<>(docsTransferDTO, headers);
        return restTemplate.postForObject(fast_api_uri+"/add_doc", requestEntity, String.class);
    }

}
