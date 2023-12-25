package com.lostanimals.lostanimalsbackend.repository;

import com.lostanimals.lostanimalsbackend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
