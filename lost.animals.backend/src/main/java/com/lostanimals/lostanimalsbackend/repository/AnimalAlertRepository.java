package com.lostanimals.lostanimalsbackend.repository;

import com.lostanimals.lostanimalsbackend.entity.AnimalAlert;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnimalAlertRepository extends JpaRepository<AnimalAlert, Long> {

    @Query("SELECT a from AnimalAlert a WHERE LOWER(a.title) LIKE LOWER(CONCAT('%', :title, '%'))")
    List<AnimalAlert> findAnimalAlertByTitle(@Param("title") String title);

    List<AnimalAlert> findAnimalAlertByAnimalSpecies(String species);
}
