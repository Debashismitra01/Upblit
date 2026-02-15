package com.upblit.backend;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

@Configuration
class RestTemplateConfig{
    @Bean
    public RestTemplate restTemplate(){return new RestTemplate();}
}
