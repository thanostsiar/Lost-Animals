package com.lostanimals.lostanimalsbackend.service;

import com.lostanimals.lostanimalsbackend.entity.Animal;
import com.lostanimals.lostanimalsbackend.entity.AnimalAlert;
import com.lostanimals.lostanimalsbackend.entity.User;
import com.lostanimals.lostanimalsbackend.repository.AnimalAlertRepository;
import com.lostanimals.lostanimalsbackend.requestmodels.AddAlertRequest;
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

    /*public AnimalAlert createAnimalAlert(Long userId, Long animalId, String description, String pictureUrl, String chipNumber, String lastKnownLocation) {

        User user = userService.getUserById(userId);
        Animal animal = animalService.getAnimalById(animalId);

        AnimalAlert animalAlert = new AnimalAlert();
        animalAlert.setUser(user);
        animalAlert.setAnimal(animal);
        animalAlert.setDescription(description);
        animalAlert.setPicture_url(pictureUrl);
        animalAlert.setChip_number(chipNumber);
        animalAlert.setLast_location(lastKnownLocation);

        return animalAlertRepository.save(animalAlert);
    }*/

    public AnimalAlert createAnimalAlert(AddAlertRequest addAlertRequest) {

        User user = userService.getUserById(addAlertRequest.getUser().getId());
        Animal animal = animalService.getAnimalById(addAlertRequest.getAnimal().getId());

        AnimalAlert animalAlert = new AnimalAlert();
        animalAlert.setUser(user);
        animalAlert.setAnimal(animal);
        animalAlert.setDescription(addAlertRequest.getDescription());
        animalAlert.setPicture_url(addAlertRequest.getPicture_url());
        animalAlert.setChip_number(addAlertRequest.getChip_number());
        animalAlert.setLast_location(addAlertRequest.getLast_location());

        return animalAlertRepository.save(animalAlert);
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
