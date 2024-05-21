package com.chamchi.backend.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Value("${spring.temp-image-save-path}")
    private String tempImageSavePath;
    @Value("${spring.resource-handler-temp-url}")
    private String resourceHandlerTempUrl;

    @Value("${spring.image-save-path}")
    private String imageSavePath;
    @Value("${spring.resource-handler-url}")
    private String resourceHandlerUrl;

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler(resourceHandlerTempUrl + "**")
                .addResourceLocations(tempImageSavePath);

        registry.addResourceHandler(resourceHandlerUrl + "**")
                .addResourceLocations(imageSavePath);
    }
}
