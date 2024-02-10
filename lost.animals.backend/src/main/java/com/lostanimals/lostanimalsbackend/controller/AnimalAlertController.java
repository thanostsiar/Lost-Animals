package com.lostanimals.lostanimalsbackend.controller;

import com.lostanimals.lostanimalsbackend.entity.AnimalAlert;
import com.lostanimals.lostanimalsbackend.model.AddAlertRequest;
import com.lostanimals.lostanimalsbackend.service.AnimalAlertService;
//import com.lostanimals.lostanimalsbackend.utils.ExtractJWT;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<AnimalAlert> createAnimalAlert(@RequestBody AnimalAlert animalAlert) {

        AnimalAlert newAlert = animalAlertService.createAlert(animalAlert);

        return ResponseEntity.ok(newAlert);
    }

    /*@PostMapping("/secure/createAlert")
    public AnimalAlert createAnimalAlert(@RequestBody AddAlertRequest addAlertRequest,
                                         @RequestHeader(value = "Authorization") String token) throws  Exception{

        AnimalAlert createdAlert = animalAlertService.createAnimalAlert(addAlertRequest);
        //String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");

        return animalAlertService.createAnimalAlert(addAlertRequest);
    }*/
}
