package com.lostanimals.lostanimalsbackend.controller;

import com.lostanimals.lostanimalsbackend.dto.LoginResponseDTO;
import com.lostanimals.lostanimalsbackend.dto.UserRegistrationDTO;
import com.lostanimals.lostanimalsbackend.entity.User;
import com.lostanimals.lostanimalsbackend.service.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthenticationController {

    @Autowired
    private AuthenticationService authenticationService;

    @PostMapping("/register")
    public User registerUser(@RequestBody UserRegistrationDTO body) {
        return authenticationService.registerUser(body.getUsername(), body.getPassword());
    }

    @PostMapping("/login")
    public LoginResponseDTO loginUser(@RequestBody UserRegistrationDTO body){
        return authenticationService.loginUser(body.getUsername(), body.getPassword());
    }
}
