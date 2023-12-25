package com.lostanimals.lostanimalsbackend.repository;

import com.lostanimals.lostanimalsbackend.entity.Animal;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AnimalRepository extends JpaRepository<Animal, Long> {
}
