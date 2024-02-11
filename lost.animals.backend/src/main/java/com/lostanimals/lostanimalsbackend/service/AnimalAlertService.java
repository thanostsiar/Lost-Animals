package com.lostanimals.lostanimalsbackend.service;

import com.lostanimals.lostanimalsbackend.entity.Animal;
import com.lostanimals.lostanimalsbackend.entity.AnimalAlert;
import com.lostanimals.lostanimalsbackend.entity.User;
import com.lostanimals.lostanimalsbackend.repository.AnimalAlertRepository;
import com.lostanimals.lostanimalsbackend.model.AddAlertRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AnimalAlertService {

    private final AnimalAlertRepository animalAlertRepository;
    private final UserService userService;
    private final AnimalService animalService;

    @Autowired
    public AnimalAlertService(AnimalAlertRepository animalAlertRepository, UserService userService, AnimalService animalService) {
        this.animalAlertRepository = animalAlertRepository;
        this.userService = userService;
        this.animalService = animalService;
    }

    public AnimalAlert createAlert(AnimalAlert alert) {
        // Add any business logic here if necessary
        return animalAlertRepository.save(alert);
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
