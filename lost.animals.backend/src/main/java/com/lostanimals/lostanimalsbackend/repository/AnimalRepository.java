package com.lostanimals.lostanimalsbackend.repository;

import com.lostanimals.lostanimalsbackend.entity.Animal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AnimalRepository extends JpaRepository<Animal, Long> {

    Optional<Animal> findByChipNumber(String chipNumber);
}
