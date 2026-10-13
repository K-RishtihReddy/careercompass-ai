package com.careercompass.service;

import com.careercompass.config.JwtTokenProvider;
import com.careercompass.dto.AuthRequest;
import com.careercompass.dto.AuthResponse;
import com.careercompass.dto.RegisterRequest;
import com.careercompass.dto.UserProfileDto;
import com.careercompass.entity.User;
import com.careercompass.exception.BadRequestException;
import com.careercompass.repository.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider tokenProvider;
    private final UserService userService;

    public AuthService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder,
                       AuthenticationManager authenticationManager,
                       JwtTokenProvider tokenProvider,
                       UserService userService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.tokenProvider = tokenProvider;
        this.userService = userService;
    }

    public AuthResponse login(AuthRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new BadRequestException("User not found"));

        String token = tokenProvider.generateToken(authentication, user.getId(), user.getFullName(), user.getRole());
        UserProfileDto profileDto = userService.getCurrentUserProfile(user.getEmail());

        return new AuthResponse(token, profileDto);
    }

    @Transactional
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new BadRequestException("Email is already registered. Please sign in or use a different email.");
        }

        User user = new User();
        user.setFullName(request.getFullName().trim());
        user.setEmail(request.getEmail().trim().toLowerCase());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole("ROLE_USER");
        user.setEducationLevel(request.getEducationLevel());
        user.setDegree(request.getDegree());
        user.setGraduationYear(request.getGraduationYear());
        user.setExperienceLevel(request.getExperienceLevel() != null ? request.getExperienceLevel() : "Fresher");
        user.setProfileCompleted(false);

        User savedUser = userRepository.save(user);

        // Generate token for instant onboarding
        String token = tokenProvider.generateTokenFromUsername(
                savedUser.getEmail(), savedUser.getId(), savedUser.getFullName(), savedUser.getRole());

        UserProfileDto profileDto = userService.getCurrentUserProfile(savedUser.getEmail());
        return new AuthResponse(token, profileDto);
    }
}
