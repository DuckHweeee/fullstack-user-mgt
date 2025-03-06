package com.example.UserManagement.service;

import com.example.UserManagement.dto.LoginDTO;
import com.example.UserManagement.entity.UserEntity;
import com.example.UserManagement.repository.UserRepository;
import com.example.UserManagement.security.JwtUtil;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    public String login(LoginDTO loginDTO) {
        UserEntity user = userRepository.findByEmailId(loginDTO.getEmailId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        if (passwordEncoder.matches(loginDTO.getPassword(), user.getPassword())) {
            return jwtUtil.generateToken(user.getEmailId());
        }
        
        throw new RuntimeException("Invalid credentials");
    }
}
