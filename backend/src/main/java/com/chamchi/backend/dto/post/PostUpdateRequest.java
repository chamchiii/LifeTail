package com.chamchi.backend.dto.post;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PostUpdateRequest {
    private Integer id;

    private String userId;

    private String title;

    private String subtitle;

    private String content;

    private Integer categoryId;
}
