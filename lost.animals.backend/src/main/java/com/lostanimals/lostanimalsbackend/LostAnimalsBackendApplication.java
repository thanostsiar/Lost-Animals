package com.lostanimals.lostanimalsbackend;

import com.lostanimals.lostanimalsbackend.entity.Role;
import com.lostanimals.lostanimalsbackend.entity.User;
import com.lostanimals.lostanimalsbackend.repository.RoleRepository;
import com.lostanimals.lostanimalsbackend.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.HashSet;
import java.util.Set;

@SpringBootApplication()
public class LostAnimalsBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(LostAnimalsBackendApplication.class, args);
	}
}
