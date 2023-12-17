package com.lostanimals.lostanimalsbackend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "CLINIC")
public class Clinic {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long clinicId;

    @Column(name = "NAME", nullable = false)
    private String name;

    @Column(name = "CONTACT_INFO", nullable = false)
    private String contact_information;

    @Column(name = "LOCATION", nullable = false)
    private String location;

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

    public String getContact_information() {
        return contact_information;
    }

    public void setContact_information(String contact_information) {
        this.contact_information = contact_information;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    @Override
    public String toString() {
        return "Clinic{" +
                "clinicId=" + clinicId +
                ", name='" + name + '\'' +
                ", contact_information='" + contact_information + '\'' +
                ", location='" + location + '\'' +
                '}';
    }
}
