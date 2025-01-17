package com.lostanimals.lostanimalsbackend.service;

import com.lostanimals.lostanimalsbackend.dto.AnimalAlertDTO;
import com.lostanimals.lostanimalsbackend.entity.Animal;
import com.lostanimals.lostanimalsbackend.entity.AnimalAlert;
import com.lostanimals.lostanimalsbackend.entity.User;
import com.lostanimals.lostanimalsbackend.exception.ResourceNotFoundException;
import com.lostanimals.lostanimalsbackend.repository.AnimalAlertRepository;
import com.lostanimals.lostanimalsbackend.repository.AnimalRepository;
import com.lostanimals.lostanimalsbackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class AnimalAlertService {

    private final AnimalAlertRepository animalAlertRepository;
    private final UserRepository userRepository;
    private final AnimalRepository animalRepository;
    private final ImageService imageService;

    @Autowired
    public AnimalAlertService(AnimalAlertRepository animalAlertRepository, UserRepository userRepository, AnimalRepository animalRepository, ImageService imageService) {
        this.animalAlertRepository = animalAlertRepository;
        this.userRepository = userRepository;
        this.animalRepository = animalRepository;
        this.imageService = imageService;
    }

    public AnimalAlert createAlert(AnimalAlertDTO animalAlertDTO, MultipartFile imagePath) throws IOException {
        User user = userRepository.findByEmail(animalAlertDTO.getUserEmail())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        Optional<Animal> optionalAnimal = animalRepository.findByChipNumber(animalAlertDTO.getChipNumber());
        Animal animal;

        if (optionalAnimal.isPresent()) {
            animal = optionalAnimal.get();
        } else {
            animal = new Animal();
            animal.setChipNumber(animalAlertDTO.getChipNumber());
            animal.setName(animalAlertDTO.getName());
            animal.setSpecies(animalAlertDTO.getSpecies());
            animal.setColor(animalAlertDTO.getColor());

            animal = animalRepository.save(animal);
        }
        String fileName = imageService.generateUniqueFileName();
        imageService.saveImageToFileSystem(imagePath, fileName);
        String staticContentPath = imageService.constructStaticContentPath(fileName);


        AnimalAlert animalAlert = new AnimalAlert();
        animalAlert.setTitle(animalAlertDTO.getTitle());
        animalAlert.setDescription(animalAlertDTO.getDescription());
        animalAlert.setImagePath(staticContentPath);
        animalAlert.setLast_location(animalAlertDTO.getLastLocation());
        animalAlert.setAnimal(animal);
        animalAlert.setUser(user);


        return animalAlertRepository.save(animalAlert);
    }

    public void deleteAlert(Long id) {

        AnimalAlert animalAlert = animalAlertRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Alert not found with id : " + id));

        animalAlertRepository.deleteAnimalAlertById(animalAlert.getId());
    }

    public List<AnimalAlert> getAllAnimalAlerts() {
        return animalAlertRepository.findAll();
    }

    public List<AnimalAlert> findAnimalAlertByTitle(String title) {
        return animalAlertRepository.findAnimalAlertByTitle(title);
    }

    public List<AnimalAlert> findAnimalAlertByAnimalSpecies(String species) {
        if (species.equalsIgnoreCase("dog") || species.equalsIgnoreCase("cat")) {
            return animalAlertRepository.findAnimalAlertByAnimalSpecies(species);
        } else {
            return animalAlertRepository.findOtherAnimalAlerts();
        }
    }
}
