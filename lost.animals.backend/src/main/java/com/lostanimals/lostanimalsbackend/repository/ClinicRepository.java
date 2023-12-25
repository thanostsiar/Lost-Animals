package com.lostanimals.lostanimalsbackend.repository;

import com.lostanimals.lostanimalsbackend.entity.Clinic;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClinicRepository extends JpaRepository<Clinic, Long> {
}
