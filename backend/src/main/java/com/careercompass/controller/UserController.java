package com.careercompass.controller;

import com.careercompass.dto.ApiResponse;
import com.careercompass.dto.UserProfileDto;
import com.careercompass.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<UserProfileDto>> getCurrentUser(@AuthenticationPrincipal UserDetails userDetails) {
        UserProfileDto profile = userService.getCurrentUserProfile(userDetails.getUsername());
        return ResponseEntity.ok(ApiResponse.success(profile));
    }

    @PutMapping("/me")
    public ResponseEntity<ApiResponse<UserProfileDto>> updateCurrentUser(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestBody UserProfileDto updateDto) {
        UserProfileDto updated = userService.updateUserProfile(userDetails.getUsername(), updateDto);
        return ResponseEntity.ok(ApiResponse.success("Profile updated successfully", updated));
    }
}
