package com.chamchi.backend;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


/*
*       React - SpringBoot CORS 충돌 오류 해결을 위한 클래스
* */
@Configuration
@EnableWebMvc
public class WebMvcConfig implements WebMvcConfigurer {
    @Value("${spring.allowed-origins-local}")
    private String allowedOriginsLocal;
    @Value("${spring.allowed-origins-web-server}")
    private String allowedOriginsApiServer;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins(allowedOriginsLocal, allowedOriginsApiServer)
                .allowedMethods("OPTIONS", "GET", "POST", "PUT", "DELETE", "HEAD")
                .allowedHeaders("*");
    }
}
