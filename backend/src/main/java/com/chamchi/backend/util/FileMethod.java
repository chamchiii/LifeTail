package com.chamchi.backend.util;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

public class FileMethod {
    public String moveFile(String sourceDirectory, String destinationDirectory) {
        String destination = null;
        try {
            Path sourcePath = Paths.get(sourceDirectory);
            Path destinationPath = Paths.get(destinationDirectory, sourcePath.getFileName().toString());

            Files.copy(sourcePath, destinationPath);

            if(Files.exists(destinationPath)) {
                System.out.println(">>> File Move Success!!!");
                Files.delete(sourcePath);
                System.out.println(">>> File delete Success!!!");

                destination = destinationPath.toString();
            }else {
                System.out.println(">>> Copy Fail...");
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return destination;
    }
}
