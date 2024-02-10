package com.lostanimals.lostanimalsbackend.service;

import com.lostanimals.lostanimalsbackend.dto.LoginDTO;
import com.lostanimals.lostanimalsbackend.dto.RegisterDTO;
import org.springframework.stereotype.Service;

@Service
public interface AuthenticationService {
    String register(RegisterDTO registerDto);

    String login(LoginDTO loginDto);
}
