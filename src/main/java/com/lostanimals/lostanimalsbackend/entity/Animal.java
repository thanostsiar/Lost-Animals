package com.lostanimals.lostanimalsbackend.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
public class Animal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long animalId;

    @Column(name = "NAME", nullable = false)
    private String name;

    @Column(name = "SPECIES")
    private String species;

    @Column(name = "BREED")
    private String breed;

    @Column(name = "DESCRIPTION")
    private String description;

    @Column(name = "DATE_TIME_LOST_OR_FOUND")
    private LocalDateTime dateTimeLostOrFound;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "animal", cascade = CascadeType.ALL)
    private Set<Image> images = new HashSet<>();

    @OneToMany(mappedBy = "animal", cascade = CascadeType.ALL)
    private Set<ChatMessage> chatMessages = new HashSet<>();
}
