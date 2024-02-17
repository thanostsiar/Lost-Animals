package com.lostanimals.lostanimalsbackend.controller;

import com.lostanimals.lostanimalsbackend.dto.AnimalAlertDTO;
import com.lostanimals.lostanimalsbackend.entity.AnimalAlert;
import com.lostanimals.lostanimalsbackend.service.AnimalAlertService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/animal-alerts")
public class AnimalAlertController {

    private final AnimalAlertService animalAlertService;

    @Autowired
    public AnimalAlertController(AnimalAlertService animalAlertService) {
        this.animalAlertService = animalAlertService;
    }

    @GetMapping("/search")
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

    @PostMapping("/createAlert")
    public ResponseEntity<?> createAnimalAlert(@RequestBody AnimalAlertDTO animalAlert) {

        try {
            AnimalAlert createdAlert = animalAlertService.createAlert(animalAlert);
            return new ResponseEntity<>(createdAlert, HttpStatus.CREATED);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>("Error creating animal alert: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}
