package com.lostanimals.lostanimalsbackend.service;

import com.lostanimals.lostanimalsbackend.dto.AnimalAlertDTO;
import com.lostanimals.lostanimalsbackend.entity.Animal;
import com.lostanimals.lostanimalsbackend.entity.AnimalAlert;
import com.lostanimals.lostanimalsbackend.entity.User;
import com.lostanimals.lostanimalsbackend.repository.AnimalAlertRepository;
import com.lostanimals.lostanimalsbackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AnimalAlertService {

    private final AnimalAlertRepository animalAlertRepository;
    private final UserRepository userRepository;
    private final AnimalService animalService;

    @Autowired
    public AnimalAlertService(AnimalAlertRepository animalAlertRepository, UserRepository userRepository, AnimalService animalService) {
        this.animalAlertRepository = animalAlertRepository;
        this.userRepository = userRepository;
        this.animalService = animalService;
    }

    public AnimalAlert createAlert(AnimalAlertDTO animalAlertDTO) {
        // You may perform additional business logic/validation here before saving to the database
        User user = userRepository.findByEmail(animalAlertDTO.getUserEmail())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        AnimalAlert animalAlert = new AnimalAlert();
        animalAlert.setTitle(animalAlertDTO.getTitle());
        animalAlert.setDescription(animalAlertDTO.getDescription());
        animalAlert.setChip_number(animalAlertDTO.getChipNumber());
        animalAlert.setPicture_url(animalAlertDTO.getImage());
        animalAlert.setLast_location(animalAlertDTO.getLastLocation());

        Animal animal = new Animal();
        animal.setName(animalAlertDTO.getName());
        animal.setSpecies(animalAlertDTO.getSpecies());
        animal.setColor(animalAlertDTO.getColor());

        animalAlert.setAnimal(animal);
        animalAlert.setUser(user);


        return animalAlertRepository.save(animalAlert);
    }


    public List<AnimalAlert> getAllAnimalAlerts() {
        return animalAlertRepository.findAll();
    }

    public List<AnimalAlert> findAnimalAlertByTitle (String title) {
        return animalAlertRepository.findAnimalAlertByTitle(title);
    }

    public List<AnimalAlert> findAnimalAlertByAnimalSpecies (String species) {
        return animalAlertRepository.findAnimalAlertByAnimalSpecies(species);
    }
}
