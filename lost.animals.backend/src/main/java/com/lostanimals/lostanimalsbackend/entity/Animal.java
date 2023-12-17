package com.lostanimals.lostanimalsbackend.entity;

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

    @Column(name = "SPECIES", nullable = false)
    private String species;

    @Column(name = "BREED", nullable = false)
    private String breed;

    @Column(name = "COLOR", nullable = true)
    private String color;

    @OneToMany(mappedBy = "animal", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<AnimalAlert> animalAlertSet = new HashSet<>();
}
