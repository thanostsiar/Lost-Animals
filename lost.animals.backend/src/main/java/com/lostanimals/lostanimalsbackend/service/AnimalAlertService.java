package com.lostanimals.lostanimalsbackend.service;

import com.lostanimals.lostanimalsbackend.entity.AnimalAlert;
import com.lostanimals.lostanimalsbackend.repository.AnimalAlertRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AnimalAlertService {

    private final AnimalAlertRepository animalAlertRepository;

    @Autowired
    public AnimalAlertService(AnimalAlertRepository animalAlertRepository) {
        this.animalAlertRepository = animalAlertRepository;
    }

    public void createAnimalAlert(AnimalAlert animalAlert) {
        // Perform animal alert creation logic
        animalAlertRepository.save(animalAlert);
    }

    public List<AnimalAlert> getAllAnimalAlerts() {
        // Retrieve all animal alerts
        return animalAlertRepository.findAll();
    }

    public List<AnimalAlert> findAnimalAlertByTitle (String title) {
        return animalAlertRepository.findAnimalAlertByTitle(title);
    }

    public List<AnimalAlert> findAnimalAlertByAnimalSpecies (String species) {
        return animalAlertRepository.findAnimalAlertByAnimalSpecies(species);
    }
}
