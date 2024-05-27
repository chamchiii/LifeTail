package com.chamchi.backend.repository.post.image;

import com.chamchi.backend.domain.post.image.ImageTemp;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImageTempRepository extends JpaRepository<ImageTemp, Integer> {
    ImageTemp findByImageName(String imageName);
}
