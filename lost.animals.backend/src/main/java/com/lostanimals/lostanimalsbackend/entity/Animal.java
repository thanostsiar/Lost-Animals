package com.lostanimals.lostanimalsbackend.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "ANIMAL")
public class Animal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "NAME", nullable = true)
    private String name;

    @Column(name = "SPECIES", nullable = true)
    private String species;

    @Column(name = "COLOR", nullable = true)
    private String color;

    @OneToMany(mappedBy = "animal", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonBackReference
    private Set<AnimalAlert> animalAlertSet = new HashSet<>();

    public Animal() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public Set<AnimalAlert> getAnimalAlertSet() {
        return animalAlertSet;
    }

    public void setAnimalAlertSet(Set<AnimalAlert> animalAlertSet) {
        this.animalAlertSet = animalAlertSet;
    }

    @Override
    public String toString() {
        return "Animal{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", species='" + species + '\'' +
                ", color='" + color + '\'' +
                ", animalAlertSet=" + animalAlertSet +
                '}';
    }
}
