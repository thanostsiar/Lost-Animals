package com.lostanimals.lostanimalsbackend.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

@Entity
@Table(name = "ANIMAL_ALERT")
public class AnimalAlert {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "TITLE", nullable = false)
    private String title;

    @Column(name = "DESCRIPTION", nullable = true)
    private String description;

    @Column(name = "PICTURE_URL", nullable = false)
    private String picture_url;

    @Column(name = "CHIP_NUMBER", nullable = true)
    private String chip_number;

    @Column(name = "LAST_LOCATION", nullable = true)
    private String last_location;

    @ManyToOne
    @JoinColumn(name = "owner_id")
    @JsonBackReference
    private Owner owner;

    @ManyToOne
    @JoinColumn(name = "animal_id")
    @JsonManagedReference
    private Animal animal;

    public AnimalAlert() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getPicture_url() {
        return picture_url;
    }

    public void setPicture_url(String picture_url) {
        this.picture_url = picture_url;
    }

    public String getChip_number() {
        return chip_number;
    }

    public void setChip_number(String chip_number) {
        this.chip_number = chip_number;
    }

    public String getLast_location() {
        return last_location;
    }

    public void setLast_location(String last_location) {
        this.last_location = last_location;
    }

    public Owner getOwner() {
        return owner;
    }

    public void setOwner(Owner owner) {
        this.owner = owner;
    }

    public Animal getAnimal() {
        return animal;
    }

    public void setAnimal(Animal animal) {
        this.animal = animal;
    }

    @Override
    public String toString() {
        return "AnimalAlert{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", picture_url='" + picture_url + '\'' +
                ", chip_number='" + chip_number + '\'' +
                ", last_location='" + last_location + '\'' +
                ", owner=" + owner +
                ", animal=" + animal +
                '}';
    }
}
