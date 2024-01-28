package com.lostanimals.lostanimalsbackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication()
public class LostAnimalsBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(LostAnimalsBackendApplication.class, args);
	}

}
