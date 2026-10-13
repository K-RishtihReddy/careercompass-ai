package com.careercompass.controller;

import com.careercompass.dto.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/health")
public class HealthController {

    @GetMapping
    public ResponseEntity<ApiResponse<Map<String, Object>>> checkHealth() {
        return ResponseEntity.ok(ApiResponse.success("CareerCompass AI API is up and running smoothly", Map.of(
                "status", "UP",
                "service", "CareerCompass AI Backend",
                "version", "1.0.0"
        )));
    }
}
