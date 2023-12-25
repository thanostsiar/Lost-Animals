package com.lostanimals.lostanimalsbackend.repository;

import com.lostanimals.lostanimalsbackend.entity.AnimalAlert;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AnimalAlertRepository extends JpaRepository<AnimalAlert, Long> {
}
