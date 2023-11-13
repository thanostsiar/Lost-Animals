package com.lostanimals.lostanimalsbackend.entity;

import jakarta.persistence.*;

@Entity
public class Clinic {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long clinicId;

    @Column(name = "NAME", nullable = false)
    private String name;

    @Column(name = "CONTACT_INFO", nullable = false)
    private String contactInformation;

    @ManyToOne
    @JoinColumn(name = "location_id")
    private Location location;

    public Clinic() {
    }

    public Long getClinicId() {
        return clinicId;
    }

    public void setClinicId(Long clinicId) {
        this.clinicId = clinicId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getContactInformation() {
        return contactInformation;
    }

    public void setContactInformation(String contactInformation) {
        this.contactInformation = contactInformation;
    }

    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }
}
