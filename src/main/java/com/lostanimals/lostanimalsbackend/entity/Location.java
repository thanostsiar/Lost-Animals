package com.lostanimals.lostanimalsbackend.entity;

import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "LOCATION")
public class Location {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long locationId;

    @Column(name = "LATITUDE", nullable = false)
    private double latitude;

    @Column(name = "LONGTITUDE", nullable = false)
    private double longtitude;

    @Column(name = "ADDRESS", nullable = false)
    private String address;

    @OneToMany(mappedBy = "location", cascade = CascadeType.ALL)
    private Set<Clinic> clinics = new HashSet<>();

    public Location() {
    }

    public Long getLocationId() {
        return locationId;
    }

    public void setLocationId(Long locationId) {
        this.locationId = locationId;
    }

    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    public double getLongtitude() {
        return longtitude;
    }

    public void setLongtitude(double longtitude) {
        this.longtitude = longtitude;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Set<Clinic> getClinics() {
        return clinics;
    }

    public void setClinics(Set<Clinic> clinics) {
        this.clinics = clinics;
    }

    @Override
    public String toString() {
        return "Location{" +
                "locationId=" + locationId +
                ", latitude=" + latitude +
                ", longtitude=" + longtitude +
                ", address='" + address + '\'' +
                ", clinics=" + clinics +
                '}';
    }
}
