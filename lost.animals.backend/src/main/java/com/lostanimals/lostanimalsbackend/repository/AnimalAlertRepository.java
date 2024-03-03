package com.lostanimals.lostanimalsbackend.repository;

import com.lostanimals.lostanimalsbackend.entity.AnimalAlert;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface AnimalAlertRepository extends JpaRepository<AnimalAlert, Long> {

    @Query("select a from AnimalAlert a where LOWER(a.title) like LOWER(CONCAT('%', :title, '%'))")
    List<AnimalAlert> findAnimalAlertByTitle(@Param("title") String title);

    List<AnimalAlert> findAnimalAlertByAnimalSpecies(String species);

    @Query("SELECT a FROM AnimalAlert a WHERE LOWER(a.animal.species) NOT IN ('dog', 'cat')")
    List<AnimalAlert> findOtherAnimalAlerts();

    @Transactional
    @Modifying
    @Query("delete from AnimalAlert a where a.id = :id")
    void deleteAnimalAlertById(@Param("id") Long id);
}
