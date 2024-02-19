package com.lostanimals.lostanimalsbackend.utils;

import com.lostanimals.lostanimalsbackend.entity.Role;
import com.lostanimals.lostanimalsbackend.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;


@Component
public class RoleInitializer implements ApplicationRunner {

    @Autowired
    private RoleRepository roleRepository;

    @Override
    public void run(ApplicationArguments args) throws Exception {

        if (roleRepository.findByAuthority("ROLE_USER") == null) {
            roleRepository.save(new Role("ROLE_USER"));
        }
        if (roleRepository.findByAuthority("ROLE_ADMIN") == null) {
            roleRepository.save(new Role("ROLE_ADMIN"));
        }
    }
}
