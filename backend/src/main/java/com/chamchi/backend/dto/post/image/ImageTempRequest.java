package com.chamchi.backend.dto.post.image;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ImageTempRequest {
    private String originalImageName;
    private String uuid;
    private String path;
}
