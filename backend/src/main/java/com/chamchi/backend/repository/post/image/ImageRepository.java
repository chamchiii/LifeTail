package com.chamchi.backend.repository.post.image;

import com.chamchi.backend.domain.post.image.Image;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImageRepository extends JpaRepository<Image, Integer> {
}
