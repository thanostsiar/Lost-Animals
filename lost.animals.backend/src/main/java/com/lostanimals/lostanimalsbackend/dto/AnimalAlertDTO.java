package com.lostanimals.lostanimalsbackend.dto;

public class AnimalAlertDTO {
    private String title;
    private String chipNumber;
    private String description;
    private String lastLocation;
    private String imageFile;
    private String name;
    private String species;
    private String color;
    private String userEmail;

    public AnimalAlertDTO() {
    }

    public AnimalAlertDTO(String title, String chipNumber, String description, String lastLocation, String imageFile, String name, String species, String color, String userEmail) {
        this.title = title;
        this.chipNumber = chipNumber;
        this.description = description;
        this.lastLocation = lastLocation;
        this.imageFile = imageFile;
        this.name = name;
        this.species = species;
        this.color = color;
        this.userEmail = userEmail;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getChipNumber() {
        return chipNumber;
    }

    public void setChipNumber(String chipNumber) {
        this.chipNumber = chipNumber;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getLastLocation() {
        return lastLocation;
    }

    public void setLastLocation(String lastLocation) {
        this.lastLocation = lastLocation;
    }

    public String getImage() {
        return imageFile;
    }

    public void setImage(String imageFile) {
        this.imageFile = imageFile;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSpecies() {
        return species;
    }

    public void setSpecies(String species) {
        this.species = species;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }
}
