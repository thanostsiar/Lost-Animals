package com.lostanimals.lostanimalsbackend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "IMAGE")
public class Image {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long imageId;

    @Column(name = "FILENAME")
    private String filename;

    @ManyToOne
    @JoinColumn(name = "animal_id")
    private Animal animal;

    public Image() {
    }

    public Long getImageId() {
        return imageId;
    }

    public void setImageId(Long imageId) {
        this.imageId = imageId;
    }

    public String getFilename() {
        return filename;
    }

    public void setFilename(String filename) {
        this.filename = filename;
    }

    public Animal getAnimal() {
        return animal;
    }

    public void setAnimal(Animal animal) {
        this.animal = animal;
    }

    @Override
    public String toString() {
        return "Image{" +
                "imageId=" + imageId +
                ", filename='" + filename + '\'' +
                ", animal=" + animal +
                '}';
    }
}
