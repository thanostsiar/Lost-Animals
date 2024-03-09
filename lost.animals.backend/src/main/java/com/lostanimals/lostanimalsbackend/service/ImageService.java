package com.lostanimals.lostanimalsbackend.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

@Service
public class ImageService {

    private static final String UPLOAD_DIR = "upload";
    private static final String STATIC_CONTENT_PATH = "upload/";

    public String saveImageToFileSystem(MultipartFile imageData, String fileName) {

        try {
            // Create the directory if it doesn't exist
            Files.createDirectories(Paths.get(UPLOAD_DIR));

            // Define the file path where the image will be saved
            String filePath = UPLOAD_DIR + "/" + fileName;

            // Write the image data to the file
            FileOutputStream fos = new FileOutputStream(filePath);
            fos.write(imageData.getBytes());
            fos.close();

            return filePath;
        } catch (IOException e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to save image to filesystem");
        }
    }

    public String generateUniqueFileName() {
        // Generate a unique filename using timestamp
        return "image_" + System.currentTimeMillis() + ".jpg";
    }
    
    public String constructStaticContentPath(String fileName) {
        StringBuilder stringBuilder = new StringBuilder("http://localhost:8080/");
        stringBuilder.append(STATIC_CONTENT_PATH).append(fileName);

        return stringBuilder.toString();
    }
}
