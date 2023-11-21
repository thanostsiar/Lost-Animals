package com.lostanimals.lostanimalsbackend.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "ANIMAL")
public class Animal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long animalId;

    @Column(name = "NAME", nullable = false)
    private String name;

    @Column(name = "SPECIES", nullable = false)
    private String species;

    @Column(name = "BREED", nullable = false)
    private String breed;

    @Column(name = "DESCRIPTION")
    private String description;

    @Column(name = "DATE_TIME_LOST_OR_FOUND", nullable = false)
    private LocalDateTime dateTimeLostOrFound;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "animal", cascade = CascadeType.ALL)
    private Set<Image> images = new HashSet<>();

    @Override
    public String toString() {
        return "Animal{" +
                "animalId=" + animalId +
                ", name='" + name + '\'' +
                ", species='" + species + '\'' +
                ", breed='" + breed + '\'' +
                ", description='" + description + '\'' +
                ", dateTimeLostOrFound=" + dateTimeLostOrFound +
                ", user=" + user +
                ", images=" + images +
                '}';
    }
}
