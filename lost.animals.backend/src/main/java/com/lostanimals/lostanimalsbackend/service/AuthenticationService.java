package com.lostanimals.lostanimalsbackend.service;

import com.lostanimals.lostanimalsbackend.dto.LoginResponseDTO;
import com.lostanimals.lostanimalsbackend.entity.Role;
import com.lostanimals.lostanimalsbackend.entity.User;
import com.lostanimals.lostanimalsbackend.repository.RoleRepository;
import com.lostanimals.lostanimalsbackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service
@Transactional
public class AuthenticationService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private TokenService tokenService;

    public User registerUser(String username, String password) {

        String encodedPassword = passwordEncoder.encode(password);
        Optional<Role> userRoleOptional = roleRepository.findByAuthority("USER");
        Role userRole = userRoleOptional.orElseThrow(() -> new RuntimeException("Role with authority 'USER' not found"));

        Set<Role> authorities = new HashSet<>();

        authorities.add(userRole);

        return userRepository.save(new User(65L, username, encodedPassword, authorities));
    }

    public LoginResponseDTO loginUser(String username, String password){

        try{
            Authentication auth = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(username, password)
            );

            String token = tokenService.generateJwt(auth);

            return new LoginResponseDTO(userRepository.findByUsername(username).get(), token);

        } catch(AuthenticationException e){
            return new LoginResponseDTO(null, "");
        }
    }
}
