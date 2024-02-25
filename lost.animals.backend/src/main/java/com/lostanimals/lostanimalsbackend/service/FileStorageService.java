package com.lostanimals.lostanimalsbackend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class FileStorageService {

    @Value("${upload.path}")
    private String uploadPath;

    public String storeFile(MultipartFile file) {

        try {
            Path path = Paths.get(uploadPath + File.separator + file.getOriginalFilename());
            Files.write(path, file.getBytes());
            return path.toString();
        } catch (IOException e) {
            throw new RuntimeException("Could not store file " + file.getOriginalFilename(), e);
        }
    }

    public void saveImage(byte[] imageData, String fileName) throws IOException {
        Path path = Paths.get("lost.animals.backend/upload", fileName);
        Files.write(path, imageData);
    }
}
