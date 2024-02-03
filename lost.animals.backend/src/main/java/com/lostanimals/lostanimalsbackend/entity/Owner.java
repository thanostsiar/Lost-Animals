package com.lostanimals.lostanimalsbackend.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "OWNER")
public class Owner {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ownerId;

    @Column(name = "FIRST_NAME", nullable = false)
    private String first_name;

    @Column(name = "LAST_NAME", nullable = false)
    private String last_name;

    @OneToMany(mappedBy = "owner", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonManagedReference
    private Set<AnimalAlert> animalAlerts = new HashSet<>();


}
