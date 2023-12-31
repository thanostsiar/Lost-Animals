package com.lostanimals.lostanimalsbackend.controller;

import com.lostanimals.lostanimalsbackend.entity.AnimalAlert;
import com.lostanimals.lostanimalsbackend.service.AnimalAlertService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/animal-alerts")
public class AnimalAlertController {

    private final AnimalAlertService animalAlertService;

    @Autowired
    public AnimalAlertController(AnimalAlertService animalAlertService) {
        this.animalAlertService = animalAlertService;
    }

    @GetMapping("/search/findAll")
    public ResponseEntity<List<AnimalAlert>> getAllAnimalAlerts() {
        List<AnimalAlert> animalAlerts = animalAlertService.getAllAnimalAlerts();
        return ResponseEntity.ok(animalAlerts);
    }
    
    @GetMapping("/search/findByTitle")
    public ResponseEntity<List<AnimalAlert>> findAnimalAlertByTitle(String title) {
        List<AnimalAlert> alerts = animalAlertService.findAnimalAlertByTitle(title);
        return ResponseEntity.ok(alerts);
    }

    @GetMapping("/search/findBySpecies")
    public ResponseEntity<List<AnimalAlert>> findAnimalAlertByAnimalSpecies(String species) {
        List<AnimalAlert> alerts = animalAlertService.findAnimalAlertByAnimalSpecies(species);
        return ResponseEntity.ok(alerts);
    }
}
