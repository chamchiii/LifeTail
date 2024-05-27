package com.chamchi.backend.dto.category;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CategoryRequest {
    private Integer id;
    private String name;
    private Integer turn;
}
